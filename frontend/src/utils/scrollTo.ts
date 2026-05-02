export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  // Scroll smoothly to the section
  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })

  // Add highlight flash effect
  element.classList.add("section-highlight")
  setTimeout(() => {
    element.classList.remove("section-highlight")
  }, 2000)
}
