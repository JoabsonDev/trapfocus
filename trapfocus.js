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

    beforeFirstElement = document.createElement("div")
    beforeFirstElement.setAttribute("tabindex", "0")
    beforeFirstElement.setAttribute("aria-hidden", "true")

    afterLastElement = document.createElement("div")
    afterLastElement.setAttribute("tabindex", "0")
    afterLastElement.setAttribute("aria-hidden", "true")

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
      beforeFirstElement = null // Clear reference
    }
    if (afterLastElement && afterLastElement.parentNode) {
      afterLastElement.parentNode.removeChild(afterLastElement)
      afterLastElement = null // Clear reference
    }
    if (observer) {
      observer.disconnect()
      observer = null // Clear reference
    }
  }

  /**
   * Gets all focusable elements within a given container.
   *
   * @param {HTMLElement} container - The container element.
   * @returns {HTMLElement[]} - An array of focusable elements.
   */
  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled"))
  }

  /**
   * Sets up focus listeners on the "ghost" elements to trap focus within the container.
   *
   * @param {HTMLElement} firstElement - The first focusable element.
   * @param {HTMLElement} lastElement - The last focusable element.
   * @param {HTMLElement} beforeFirstElement - The "ghost" element before the first focusable element.
   * @param {HTMLElement} afterLastElement - The "ghost" element after the last focusable element.
   */
  function setupFocusListeners(
    firstElement,
    lastElement,
    beforeFirstElement,
    afterLastElement
  ) {
    beforeFirstElement.addEventListener("focus", () => lastElement.focus())
    afterLastElement.addEventListener("focus", () => firstElement.focus())
  }

  /**
   * Sets the initial focus to the specified element or the first focusable element.
   *
   * @param {HTMLElement} firstElement - The first focusable element.
   * @param {string|HTMLElement} [initialFocusElement] - The initial focus element or its CSS selector.
   */
  function setInitialFocus(firstElement, initialFocusElement) {
    let initialFocus = firstElement
    if (initialFocusElement) {
      initialFocus =
        typeof initialFocusElement === "string"
          ? document.querySelector(initialFocusElement)
          : initialFocusElement
    }

    if (initialFocus) {
      initialFocus.focus()
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
