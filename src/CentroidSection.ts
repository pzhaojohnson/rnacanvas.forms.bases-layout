import type { App } from './App';

import { Centroid } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import { areWithin } from '@rnacanvas/math';

import * as $ from 'jquery';

import * as styles from './CentroidSection.css';

import { TextInput } from './TextInput';

import { TextInputField } from './TextInputField';

import { ShiftButton } from './ShiftButton';

const coordinateNames = ['x', 'y'] as const;

type CoordinateName = typeof coordinateNames[number];

function CentroidCoordinateInput(coordinateName: CoordinateName) {
  return {
    for: (targetApp: App) => {
      let input = TextInput();

      let refresh = () => {
        // only need to refresh if the input element is currently rendered
        if (document.body.contains(input)) {
          let centroid = new Centroid(targetApp.getSelectedBasesSorted());
          let coordinate = centroid.get()[coordinateName];

          // round to two decimal places and trim trailing zeros after the decimal point
          input.value = Number.parseFloat(coordinate.toFixed(2)).toString();
        }
      };

      targetApp.refreshSignal.addListener(() => refresh());

      let handleSubmit = () => {
        let value = Number.parseFloat(input.value);

        let centroid = new Centroid(targetApp.getSelectedBasesSorted());

        if (isFiniteNumber(value) && !areWithin(value, centroid.get()[coordinateName], 0.001)) {
          targetApp.drawing.beforeMovingBases();

          centroid.set({
            x: centroid.get().x,
            y: centroid.get().y,
            [coordinateName]: value,
          });

          targetApp.drawing.basesMoved();
        }
      };

      input.addEventListener('blur', handleSubmit);

      input.addEventListener('keyup', event => {
        if (event.key.toLowerCase() == 'enter') {
          handleSubmit();
        }
      });

      return input;
    },
  };
}

export class CentroidSection {
  static for(targetApp: App) {
    let centroidXInput = CentroidCoordinateInput('x').for(targetApp);
    let centroidYInput = CentroidCoordinateInput('y').for(targetApp);

    let centroidXField = TextInputField('X', centroidXInput);
    let centroidYField = TextInputField('Y', centroidYInput);

    $(centroidYField).css({ marginTop: '11px' });

    let fields = document.createElement('div');

    $(fields)
      .append(centroidXField, centroidYField)
      .css({ display: 'flex', flexDirection: 'column' });

    let centroidSectionLabel = document.createElement('p');

    $(centroidSectionLabel)
      .addClass(styles.centroidSectionLabel)
      .append('Center');

    let centroidSection = document.createElement('div');

    $(centroidSection)
      .addClass(styles.centroidSection)
      .append(fields, centroidSectionLabel, ShiftButton.for(targetApp));

    return centroidSection;
  }
}
