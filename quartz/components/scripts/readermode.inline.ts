// Load initial state from localStorage
let isReaderMode = localStorage.getItem("readerMode") === "on"

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

const updateReaderModeUI = (mode: boolean) => {
  const newMode = mode ? "on" : "off"
  document.documentElement.setAttribute("reader-mode", newMode)

  // Update button active state
  for (const button of document.getElementsByClassName("readermode")) {
    if (mode) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  }
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"

    // Save state to localStorage
    localStorage.setItem("readerMode", newMode)

    updateReaderModeUI(isReaderMode)
    emitReaderModeChangeEvent(newMode)
  }

  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", switchReaderMode)
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
  }

  // Restore state from localStorage on page load
  updateReaderModeUI(isReaderMode)
})
