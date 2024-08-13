/**
 * Gets all focusable elements within a given container.
 *
 * @param {HTMLElement} container - The container element.
 * @returns {HTMLElement[]} - An array of focusable elements.
 */
export default function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"))
}
