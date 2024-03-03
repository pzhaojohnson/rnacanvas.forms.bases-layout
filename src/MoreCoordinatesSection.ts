import type { App } from './App';

import { MinCenterX, MaxCenterX } from '@rnacanvas/bases-layout';

import { MinCenterY, MaxCenterY } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import { areWithin } from '@rnacanvas/math';

import * as $ from 'jquery';

import { SVG } from '@svgdotjs/svg.js';

import * as styles from './MoreCoordinatesSection.css';

import { TextInput } from './TextInput';

import { TextInputField } from './TextInputField';

function HeaderCaret() {
  let draw = SVG();

  draw.addClass(styles.headerCaret);

  draw
    .viewbox(0, 0, 6, 10)
    .attr({ 'width': '6px', 'height': '10px' });

  draw.path()
    .attr('d', 'M 1 1 L 5 5 L 1 9')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('fill', 'none');

  return draw.node;
}

function Header() {
  let header = document.createElement('button');

  $(header)
    .addClass(styles.header)
    .append(HeaderCaret(), 'More Coordinates');

  return header;
}

const coordinateNames = ['Left', 'Right', 'Top', 'Bottom'] as const;

type CoordinateName = typeof coordinateNames[number];

const Coordinates = {
  'Left': MinCenterX,
  'Right': MaxCenterX,
  'Top': MinCenterY,
  'Bottom': MaxCenterY,
};

function CoordinateInput(coordinateName: CoordinateName) {
  return {
    for: (targetApp: App) => {
      let coordinateInput = TextInput();

      let Coordinate = Coordinates[coordinateName];

      let refresh = () => {
        // only need to refresh if the input element is currently visible
        if (document.body.contains(coordinateInput)) {
          let coordinate = new Coordinate(targetApp.getSelectedBasesSorted());

          // round to two decimal places and remove trailing zeros after the decimal point
          coordinateInput.value = Number.parseFloat(coordinate.get().toFixed(2)).toString();
        }
      };

      targetApp.refreshSignal.addListener(() => refresh());

      let handleSubmit = () => {
        let value = Number.parseFloat(coordinateInput.value);

        let coordinate = new Coordinate(targetApp.getSelectedBasesSorted());

        if (isFiniteNumber(value) && !areWithin(value, coordinate.get(), 0.001)) {
          targetApp.drawing.beforeMovingBases();
          coordinate.set(value);
          targetApp.drawing.basesMoved();
        }
      };

      coordinateInput.addEventListener('blur', handleSubmit);

      coordinateInput.addEventListener('keyup', event => {
        if (event.key.toLowerCase() == 'enter') {
          handleSubmit();
        }
      });

      return coordinateInput;
    },
  };
}

function CoordinateField(coordinateName: CoordinateName) {
  return {
    for: (targetApp: App) => {
      let coordinateInput = CoordinateInput(coordinateName).for(targetApp);

      return TextInputField(coordinateName, coordinateInput);
    },
  };
}

export class MoreCoordinatesSection {
  static for(targetApp: App) {
    let header = Header();

    let content = document.createElement('div');

    $(content)
      .addClass(styles.content)
      .append(CoordinateField('Left').for(targetApp))
      .append(CoordinateField('Right').for(targetApp))
      .append(CoordinateField('Top').for(targetApp))
      .append(CoordinateField('Bottom').for(targetApp));

    let moreCoordinatesSection = document.createElement('div');

    $(moreCoordinatesSection)
      .addClass(styles.moreCoordinatesSection);

    $(header).on('click', () => $(moreCoordinatesSection).toggleClass(styles.open));

    $(moreCoordinatesSection)
      .append(header)
      .append(content);

    return moreCoordinatesSection;
  }
}
