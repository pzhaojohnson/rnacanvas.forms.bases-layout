import type { App } from './App';

import { rotate } from '@rnacanvas/bases-layout';

import { direction } from '@rnacanvas/points';

import { centroid } from '@rnacanvas/points';

import * as $ from 'jquery';

import { SVG } from '@svgdotjs/svg.js';

import * as styles from './RotateButton.css';

function RotateIcon() {
  let draw = SVG();

  draw
    .viewbox(-3.5, -3.5, 25, 25)
    .attr({ 'width': '25px', 'height': '25px' })
    .css({ 'transform': 'rotate(45deg)' });

  draw.path()
    .attr('d', 'M 17 9 A 8 8 270 1 1 9 1')
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none');

  draw.path()
    .attr('d', 'M 9 -3 L 13 1 L 9 5 z')
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('fill', 'white');

  return draw.node;
}

export class RotateButton {
  static for(targetApp: App) {
    let rotateButton = document.createElement('button');

    $(rotateButton)
      .addClass(styles.rotateButton)
      .append(RotateIcon());

    let isActive = false;

    let movedBases = false;

    let previousDirection = 0;

    rotateButton.addEventListener('mousedown', event => {
      isActive = true;

      previousDirection = direction(
        centroid(targetApp.getSelectedBasesSorted().map(b => b.getCenterClientPoint())),
        { x: event.clientX, y: event.clientY },
      );
    });

    window.addEventListener('mousemove', event => {
      if (isActive) {
        if (!movedBases) {
          targetApp.drawing.beforeMovingBases();
          targetApp.drawing.movingBases();
          movedBases = true;
        }

        let selectedBases = targetApp.getSelectedBasesSorted();

        let currentDirection = direction(
          centroid(selectedBases.map(b => b.getCenterClientPoint())),
          { x: event.clientX, y: event.clientY },
        );

        rotate(selectedBases, currentDirection - previousDirection);

        previousDirection = currentDirection;

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

    return rotateButton;
  }
}
