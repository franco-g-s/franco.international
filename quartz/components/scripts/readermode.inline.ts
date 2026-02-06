let isReaderMode = false

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"
    document.documentElement.setAttribute("reader-mode", newMode)
    emitReaderModeChangeEvent(newMode)

    // Update button active state
    for (const button of document.getElementsByClassName("readermode")) {
      if (isReaderMode) {
        button.classList.add("active")
      } else {
        button.classList.remove("active")
      }
    }
  }

  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", switchReaderMode)
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
  }

  // Set initial state
  document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off")
})
