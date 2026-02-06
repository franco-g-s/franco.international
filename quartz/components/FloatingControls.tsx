import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { concatenateResources } from "../util/resources"
import style from "./styles/floatingcontrols.scss"

interface FloatingControlsOptions {
  components: QuartzComponent[]
}

export default ((opts?: Partial<FloatingControlsOptions>) => {
  const FloatingControlsComponent: QuartzComponent = (props: QuartzComponentProps) => {
    const components = opts?.components ?? []

    return (
      <div class="floating-controls">
        {components.map((Component) => (
          <Component {...props} displayClass="" />
        ))}
      </div>
    )
  }

  FloatingControlsComponent.css = style

  // Collect and forward scripts from child components
  const childComponents = opts?.components ?? []
  const allScripts = childComponents
    .map((Component) => Component.beforeDOMLoaded)
    .filter((script) => script !== undefined)

  if (allScripts.length > 0) {
    FloatingControlsComponent.beforeDOMLoaded = concatenateResources(allScripts)
  }

  return FloatingControlsComponent
}) satisfies QuartzComponentConstructor
