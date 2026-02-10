import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "./styles/legacyToc.scss"
import modernStyle from "./styles/toc.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/toc.inline"
import { i18n } from "../i18n"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"

interface Options {
  layout: "modern" | "legacy"
  collapseByDefault?: boolean
}

const defaultOptions: Options = {
  layout: "modern",
  collapseByDefault: true,
}

let numTocs = 0
export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  const collapseByDefault = opts?.collapseByDefault ?? defaultOptions.collapseByDefault
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  const TableOfContents: QuartzComponent = ({
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (!fileData.toc) {
      return null
    }

    const isCollapsed = fileData.collapseToc ?? collapseByDefault
    const id = `toc-${numTocs++}`
    return (
      <div class={classNames(displayClass, "toc", "no-transition")}>
        <button
          type="button"
          class={isCollapsed ? "collapsed toc-header" : "toc-header"}
          aria-controls={id}
          aria-expanded={!isCollapsed}
        >
          <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <OverflowList
          id={id}
          class={isCollapsed ? "collapsed toc-content" : "toc-content"}
        >
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
              </a>
            </li>
          ))}
        </OverflowList>
      </div>
    )
  }

  TableOfContents.css = modernStyle

  // Prevent animation flicker on initial load by removing transitions class after a moment
  const preventFlickerScript = `
document.addEventListener("nav", () => {
  // Remove no-transition class after initial render to re-enable animations
  setTimeout(() => {
    const tocs = document.querySelectorAll(".toc")
    tocs.forEach((toc) => {
      toc.classList.remove("no-transition")
    })
  }, 50)
})
`

  TableOfContents.afterDOMLoaded = concatenateResources(
    script,
    overflowListAfterDOMLoaded,
    preventFlickerScript,
  )

  const LegacyTableOfContents: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    if (!fileData.toc) {
      return null
    }
    const isCollapsed = fileData.collapseToc ?? collapseByDefault
    return (
      <details class="toc" open={!isCollapsed}>
        <summary>
          <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        </summary>
        <ul>
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    )
  }
  LegacyTableOfContents.css = legacyStyle

  return layout === "modern" ? TableOfContents : LegacyTableOfContents
}) satisfies QuartzComponentConstructor
