import type { App } from './App';

import { Direction } from '@rnacanvas/bases-layout';

import { degrees, radians } from '@rnacanvas/math';

import { isFiniteNumber } from '@rnacanvas/value-check';

import { areWithin } from '@rnacanvas/math';

import * as $ from 'jquery';

import { TextInput } from './TextInput';

import { TextInputField } from './TextInputField';

import { RotateButton } from './RotateButton';

const degreeCharacter = String.fromCharCode(176);

class DirectionInput {
  static for(targetApp: App) {
    let directionInput = TextInput();

    let refresh = () => {
      // only need to refresh if the direction input element is currently rendered
      if (document.body.contains(directionInput)) {
        let direction = new Direction(targetApp.getSelectedBasesSorted());

        // round to two decimal places and trim trailing zeros after the decimal point
        directionInput.value = Number.parseFloat(degrees(direction.get()).toFixed(2)).toString();
        directionInput.value += degreeCharacter;
      }
    };

    targetApp.refreshSignal.addListener(() => refresh());

    let handleSubmit = () => {
      let value = radians(Number.parseFloat(directionInput.value));

      let direction = new Direction(targetApp.getSelectedBasesSorted());

      if (isFiniteNumber(value) && !areWithin(value, direction.get(), 0.001)) {
        targetApp.drawing.beforeMovingBases();
        direction.set(value);
        targetApp.drawing.basesMoved();
      }
    };

    directionInput.addEventListener('blur', handleSubmit);

    directionInput.addEventListener('keyup', event => {
      if (event.key.toLowerCase() == 'enter') {
        handleSubmit();
      }
    });

    return directionInput;
  }
}

export class DirectionSection {
  static for(targetApp: App) {
    let directionInput = DirectionInput.for(targetApp);

    let directionField = TextInputField('Rotation', directionInput);

    let directionSection = document.createElement('div');

    $(directionSection)
      .append(directionField)
      .append(RotateButton.for(targetApp))
      .css({ display: 'flex', flexDirection: 'row', alignItems: 'center' });

    $(directionSection).css({ marginTop: '33px' });

    return directionSection;
  }
}
