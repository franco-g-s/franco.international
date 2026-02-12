const observer = new IntersectionObserver((entries) => {
  // Find all headers and determine which one is currently active
  const headers = Array.from(document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"))

  // Find the header closest to the top of the viewport that is currently visible
  let activeHeader = null
  let closestDistance = Infinity

  for (const header of headers) {
    const rect = header.getBoundingClientRect()
    // Consider headers that are at or above the top third of the viewport
    if (rect.top <= window.innerHeight / 3) {
      const distance = Math.abs(rect.top)
      if (distance < closestDistance) {
        closestDistance = distance
        activeHeader = header
      }
    }
  }

  // Remove "in-view" from all TOC entries
  const allTocEntries = document.querySelectorAll(".toc a[data-for]")
  allTocEntries.forEach((entry) => entry.classList.remove("in-view"))

  // Add "in-view" only to the active header's TOC entry
  if (activeHeader) {
    const activeSlug = activeHeader.id
    const activeTocEntries = document.querySelectorAll(`a[data-for="${activeSlug}"]`)
    activeTocEntries.forEach((entry) => entry.classList.add("in-view"))
  }
})

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }
}

document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
