/**
 * A two-dimensional point.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * The nucleobase interface used by the bases-layout form.
 */
export interface Nucleobase {
  /**
   * Returns the center point of the nucleobase within the coordinate system of its parent drawing.
   */
  getCenterPoint(): Point;

  setCenterPoint(p: Point): void;

  /**
   * Returns the center point of the nucleobase within the client coordinate system of the user
   * (i.e., the same coordinate sytem used by methods such as `getBoundingClientRect`).
   */
  getCenterClientPoint(): Point;
}
