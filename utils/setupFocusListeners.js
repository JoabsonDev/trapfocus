/**
 * Sets up focus listeners on the "ghost" elements to trap focus within the container.
 *
 * @param {HTMLElement} firstElement - The first focusable element.
 * @param {HTMLElement} lastElement - The last focusable element.
 * @param {HTMLElement} beforeFirstElement - The "ghost" element before the first focusable element.
 * @param {HTMLElement} afterLastElement - The "ghost" element after the last focusable element.
 */
export default function setupFocusListeners(
  firstElement,
  lastElement,
  beforeFirstElement,
  afterLastElement
) {
  beforeFirstElement.addEventListener("focus", () => lastElement.focus())
  afterLastElement.addEventListener("focus", () => firstElement.focus())
}
