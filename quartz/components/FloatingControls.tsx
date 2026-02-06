import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
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

  return FloatingControlsComponent
}) satisfies QuartzComponentConstructor
