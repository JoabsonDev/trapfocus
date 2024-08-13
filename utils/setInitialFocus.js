/**
 * Sets the initial focus to the specified element or the first focusable element.
 *
 * @param {HTMLElement} firstElement - The first focusable element.
 * @param {string|HTMLElement} [initialFocusElement] - The initial focus element or its CSS selector.
 */
export default function setInitialFocus(firstElement, initialFocusElement) {
  let initialFocus = firstElement
  if (initialFocusElement) {
    initialFocus =
      typeof initialFocusElement === "string"
        ? document.querySelector(initialFocusElement)
        : initialFocusElement
  }

  if (initialFocus) {
    if (initialFocus.tabIndex < 0) initialFocus.setAttribute("tabindex", "-1")

    initialFocus.focus()
  }
}
