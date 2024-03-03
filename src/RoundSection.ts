import type { App } from './App';

import { round } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

const defaultSpacing = 9;

export class RoundSection {
  static for(targetApp: App) {
    let spacingInput = FiniteNumberInput();

    spacingInput.value = defaultSpacing.toString();

    let spacingField = TextInputField('Spacing', spacingInput);

    $(spacingField).css({ margin: '14px 0px 0px 14px' });

    let roundButton = DarkSolidButton();

    $(roundButton)
      .text('Round');

    $(roundButton).on('click', () => {
      let spacing = Number.parseFloat(spacingInput.value);

      spacing = isFiniteNumber(spacing) ? spacing : defaultSpacing;

      targetApp.drawing.beforeMovingBases();
      round(targetApp.getSelectedBasesSorted(), { spacing });
      targetApp.drawing.basesMoved();
    });

    let roundSection = document.createElement('div');

    $(roundSection)
      .append(roundButton)
      .append(spacingField)
      .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

    $(roundSection).css({ marginTop: '40px' });

    return roundSection;
  }
}
