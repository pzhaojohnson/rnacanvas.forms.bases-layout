import type { Nucleobase } from './Nucleobase';

import type { SecondaryBond } from './SecondaryBond';

/**
 * The app interface used by the bases-layout form.
 */
export interface App {
  /**
   * The nucleic acid structure drawing of the app.
   */
  readonly drawing: {
    /**
     * Returns all secondary bonds in the drawing.
     *
     * Secondary bonds are interpreted to represent base-pairs in the drawing.
     */
    getAllSecondaryBonds(): SecondaryBond[];

    /**
     * To be called just before moving bases in the drawing
     * to trigger actions such as pushing the undo stack.
     */
    beforeMovingBases(): void;

    /**
     * To be called after moving bases to trigger follow-up actions,
     * such as refreshing the app and repositioning bonds and base numberings, etc.
     */
    basesMoved(): void;

    /**
     * To be called if bases are being moved in a continuous, real-time manner (e.g., by dragging).
     *
     * This allows for certain performance optimizations (e.g., hiding interaction overlays,
     * delaying refreshing the app) to be made while bases are being moved.
     */
    movingBases(): void;

    /**
     * To be called after the `movingBases` method to indicate that bases are done being moved.
     *
     * It is critical that this method always be called at some point after the `movingBases` method is called,
     * to undo the actions of the `movingBases` method.
     *
     * (It is not necessary to call this method if the `movingBases` method was not called beforehand.)
     */
    doneMovingBases(): void;

    /**
     * The current zoom factor of the drawing.
     */
    readonly zoomFactor: number;
  }

  /**
   * Returns the currently selected bases in drawing order
   * (i.e., in the order determined by the ordering of sequences in the drawing of the app).
   */
  getSelectedBasesSorted(): Nucleobase[];

  /**
   * A signal that is given when the components of the app are to be refreshed.
   */
  readonly refreshSignal: {
    /**
     * Adds a listener for the refresh signal.
     */
    addListener(listener: () => void): void;
  };
}
