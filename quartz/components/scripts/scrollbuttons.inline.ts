document.addEventListener("nav", () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    })
  }

  for (const topButton of document.getElementsByClassName("scroll-to-top")) {
    topButton.addEventListener("click", scrollToTop)
    window.addCleanup(() => topButton.removeEventListener("click", scrollToTop))
  }

  for (const bottomButton of document.getElementsByClassName("scroll-to-bottom")) {
    bottomButton.addEventListener("click", scrollToBottom)
    window.addCleanup(() => bottomButton.removeEventListener("click", scrollToBottom))
  }
})
