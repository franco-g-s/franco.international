// @ts-ignore
import scrollButtonsScript from "./scripts/scrollbuttons.inline"
import styles from "./styles/scrollbuttons.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ScrollButtons: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "scroll-buttons")}>
      <button class="scroll-to-top" aria-label="Scroll to top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      <button class="scroll-to-bottom" aria-label="Scroll to bottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  )
}

ScrollButtons.beforeDOMLoaded = scrollButtonsScript
ScrollButtons.css = styles

export default (() => ScrollButtons) satisfies QuartzComponentConstructor
