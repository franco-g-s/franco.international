import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.FloatingControls({
      components: [Component.Darkmode(), Component.ReaderMode()],
    }),
    Component.ScrollButtons(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/franco-g-s",
      Email: "mailto:franco@goxcoworld.com",
      Instagram: "https://instagram.com/gsfranco2006/",
      Strava: "https://www.strava.com/athletes/fgomezschumacher",
      LinkedIn: "https://www.linkedin.com/in/franco-g%C3%B3mez-schumacher-17a985123/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.FrontmatterProperties(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Explorer(),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          showTags: false,
        },
        globalGraph: {
          showTags: false,
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          showTags: false,
          depth: 1,
        },
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.DesktopOnly(Component.TableOfContents({ collapseByDefault: true })),
    Component.Backlinks({ hideWhenEmpty: false }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Explorer(),
  ],
  right: [],
}
