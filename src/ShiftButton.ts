import type { App } from './App';

import { shift } from '@rnacanvas/bases-layout';

import { displacement } from '@rnacanvas/points';

import { magnitude, direction } from '@rnacanvas/vectors';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { SVG } from '@svgdotjs/svg.js';

import * as styles from './ShiftButton.css';

function ShiftIcon() {
  let draw = SVG();

  draw
    .viewbox(-1, -1, 22, 22)
    .attr({ 'width': '22px', 'height': '22px' });

  draw.path()
    .addClass(styles.shiftIconArrowShaft)
    .attr('d', 'M 10 10 L 10 2 M 10 10 L 18 10 M 10 10 L 10 18 M 10 10 L 2 10');

  draw.path()
    .addClass(styles.shiftIconArrowHead)
    .attr('d', 'M 7 3 L 10 0 L 13 3 z');

  draw.path()
    .addClass(styles.shiftIconArrowHead)
    .attr('d', 'M 17 7 L 20 10 L 17 13 z');

  draw.path()
    .addClass(styles.shiftIconArrowHead)
    .attr('d', 'M 13 17 L 10 20 L 7 17 z');

  draw.path()
    .addClass(styles.shiftIconArrowHead)
    .attr('d', 'M 3 7 L 0 10 L 3 13 z');

  return draw.node;
}

export class ShiftButton {
  static for(targetApp: App) {
    let shiftButton = document.createElement('button');

    $(shiftButton)
      .addClass(styles.shiftButton)
      .append(ShiftIcon());

    let isActive = false;

    let movedBases = false;

    let previousPoint = { x: 0, y: 0 };

    $(shiftButton).on('mousedown', event => {
      isActive = true;
      movedBases = false;

      previousPoint = { x: event.clientX, y: event.clientY };
    });

    window.addEventListener('mousemove', event => {
      if (isActive) {
        if (!movedBases) {
          targetApp.drawing.beforeMovingBases();
          targetApp.drawing.movingBases();
          movedBases = true;
        }

        let currentPoint = { x: event.clientX, y: event.clientY };

        let d = displacement(previousPoint, currentPoint);
        let m = magnitude(d);
        let a = direction(d);

        let zoomFactor = targetApp.drawing.zoomFactor;

        // just in case the drawing has zero (or very small) area
        zoomFactor = isFiniteNumber(zoomFactor) ? zoomFactor : 1;

        m /= zoomFactor;

        shift(targetApp.getSelectedBasesSorted(), { x: m * Math.cos(a), y: m * Math.sin(a) });

        previousPoint = currentPoint;

        targetApp.drawing.basesMoved();
      }
    });

    window.addEventListener('mouseup', () => {
      if (isActive && movedBases) {
        targetApp.drawing.doneMovingBases();
      }

      isActive = false;
      movedBases = false;
    });

    return shiftButton;
  }
}
