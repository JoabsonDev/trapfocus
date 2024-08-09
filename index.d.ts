/**
 * Configuration object for creating the focus trap.
 */
interface TrapFocusConfig {
  container: string | HTMLElement
  initialFocusElement?: string | HTMLElement
}

/**
 * Object returned by the `trapFocus` function containing methods to manage the focus trap.
 */
interface TrapFocus {
  create(config: TrapFocusConfig): void
  destroy(): void
}

/**
 * Creates a focus trap within a container element.
 *
 * This function sets up a focus trap by adding "ghost" elements before the first
 * and after the last focusable elements within the container. These ghost elements
 * ensure that the focus remains within the container and wraps around when the user
 * tries to move the focus outside of it.
 *
 * @returns {TrapFocus} - An object with the `create` method to manage the focus trap.
 */
export function trapFocus(): TrapFocus
