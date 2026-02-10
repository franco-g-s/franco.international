import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"

interface FrontmatterPropertiesOptions {
  /**
   * Properties to display (in order)
   */
  properties?: string[]
}

const defaultOptions: FrontmatterPropertiesOptions = {
  properties: ["status", "author", "year", "genre", "rating", "language", "topics"],
}

export default ((opts?: Partial<FrontmatterPropertiesOptions>) => {
  const options: FrontmatterPropertiesOptions = { ...defaultOptions, ...opts }

  const FrontmatterProperties: QuartzComponent = ({
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    const frontmatter = fileData.frontmatter
    if (!frontmatter) return null

    const properties: JSX.Element[] = []

    // Helper to format array values
    const formatValue = (value: any): string => {
      if (Array.isArray(value)) {
        return value.join(", ")
      }
      return String(value)
    }

    // Helper to create property label
    const formatLabel = (key: string): string => {
      // Capitalize first letter and handle special cases
      if (key === "url") return "URL"
      return key.charAt(0).toUpperCase() + key.slice(1)
    }

    // Iterate through configured properties
    for (const prop of options.properties || []) {
      const value = frontmatter[prop]

      if (value !== undefined && value !== null && value !== "") {
        // Skip empty arrays
        if (Array.isArray(value) && value.length === 0) continue

        // Special handling for rating (show as X/7)
        if (prop === "rating") {
          properties.push(
            <div class="property">
              <span class="property-label">Rating:</span>
              <span class="property-value rating">{value}/7</span>
            </div>,
          )
        } else {
          properties.push(
            <div class="property">
              <span class="property-label">{formatLabel(prop)}:</span>
              <span class="property-value">{formatValue(value)}</span>
            </div>,
          )
        }
      }
    }

    if (properties.length === 0) return null

    return (
      <div class={classNames(displayClass, "frontmatter-properties")}>
        {properties}
      </div>
    )
  }

  FrontmatterProperties.css = `
.frontmatter-properties {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin: 1rem 0;
  padding: 0.75rem 0;
  border-top: 1px solid var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
  font-size: 0.9rem;
}

.frontmatter-properties .property {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}

.frontmatter-properties .property-label {
  font-weight: 600;
  color: var(--darkgray);
}

.frontmatter-properties .property-value {
  color: var(--dark);
}

.frontmatter-properties .property-value.rating {
  font-weight: 600;
  color: var(--secondary);
}

/* Mobile: stack properties vertically with less gap */
@media (max-width: 600px) {
  .frontmatter-properties {
    flex-direction: column;
    gap: 0.5rem;
  }
}
`

  return FrontmatterProperties
}) satisfies QuartzComponentConstructor
