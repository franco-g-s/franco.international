const observer = new IntersectionObserver(
  (entries) => {
    // On any intersection change, recalculate which header should be active
    const headers = Array.from(document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"))

    // Threshold at 30% from top of viewport
    const threshold = window.innerHeight * 0.3

    let activeHeader = null

    // Find the most recent header that crossed the threshold (closest to threshold from above)
    for (const header of headers) {
      const rect = header.getBoundingClientRect()
      if (rect.top <= threshold) {
        activeHeader = header
      }
    }

    // Remove "in-view" from ALL TOC entries first
    const allTocEntries = document.querySelectorAll(".toc a[data-for]")
    allTocEntries.forEach((entry) => entry.classList.remove("in-view"))

    // Add "in-view" ONLY to the active header's TOC entry
    if (activeHeader) {
      const activeSlug = activeHeader.id
      const activeTocEntries = document.querySelectorAll(`a[data-for="${activeSlug}"]`)
      activeTocEntries.forEach((entry) => entry.classList.add("in-view"))
    }
  },
  {
    // Trigger when headers cross the 30% line from top
    rootMargin: "-30% 0px -70% 0px",
    threshold: 0,
  }
)

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
