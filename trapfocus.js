import createGhostElement from "./utils/createGhostElement.js"
import getFocusableElements from "./utils/getFocusableElements.js"
import setInitialFocus from "./utils/setInitialFocus.js"
import setupFocusListeners from "./utils/setupFocusListeners.js"

/**
 * Creates a focus trap within a container element.
 *
 * This function sets up a focus trap by adding "ghost" elements before the first
 * and after the last focusable elements within the container. These ghost elements
 * ensure that the focus remains within the container and wraps around when the user
 * tries to move the focus outside of it.
 *
 * @returns {Object} - An object with the `create` method to manage the focus trap.
 */
export function trapFocus() {
  let beforeFirstElement = null
  let afterLastElement = null
  let observer = null

  /**
   * Creates the focus trap by adding "ghost" elements to the container.
   *
   * @param {Object} config - The configuration object for creating the focus trap.
   * @param {string|HTMLElement} config.container - The container element or its CSS selector.
   * @param {string|HTMLElement} [config.initialFocusElement] - The initial focus element or its CSS selector.
   */
  function create({ container, initialFocusElement }) {
    const containerElement =
      typeof container === "string"
        ? document.querySelector(container)
        : container

    if (!containerElement) return

    const focusableElements = getFocusableElements(containerElement)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    beforeFirstElement = createGhostElement()
    afterLastElement = createGhostElement()

    // Using insertAdjacentElement to add "ghost" elements
    containerElement.insertAdjacentElement("afterbegin", beforeFirstElement)
    containerElement.insertAdjacentElement("beforeend", afterLastElement)

    setupFocusListeners(
      firstElement,
      lastElement,
      beforeFirstElement,
      afterLastElement
    )

    // Check visibility and set initial focus
    observeIntersection(containerElement, () => {
      setInitialFocus(firstElement, initialFocusElement)
    })
  }

  /**
   * Removes the "ghost" elements and cleans up the focus trap.
   */
  function destroy() {
    if (beforeFirstElement && beforeFirstElement.parentNode) {
      beforeFirstElement.parentNode.removeChild(beforeFirstElement)
      beforeFirstElement = null
    }
    if (afterLastElement && afterLastElement.parentNode) {
      afterLastElement.parentNode.removeChild(afterLastElement)
      afterLastElement = null
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  /**
   * Observes the intersection of the container element to trigger the initial focus
   * and clean up the focus trap when the container is no longer visible.
   *
   * @param {HTMLElement} element - The container element.
   * @param {Function} callback - The callback function to execute when the element is intersecting.
   */
  function observeIntersection(element, callback) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        } else {
          destroy() // Clean up if the container is not visible
        }
      },
      { threshold: [0] }
    )

    observer.observe(element)
  }

  return { create }
}
