/**
 * Creates a "ghost" element for trapping focus.
 *
 * @returns {HTMLElement} - A div element with tabindex and aria-hidden attributes.
 */
export default function createGhostElement() {
  const element = document.createElement("div")
  element.setAttribute("tabindex", "0")
  element.setAttribute("aria-hidden", "true")
  return element
}
