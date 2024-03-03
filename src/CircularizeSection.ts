import type { App } from './App';

import { circularize } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

const defaultSpacing = 9;

const defaultTerminiGap = 18;

export class CircularizeSection {
  static for(targetApp: App) {
    let spacingInput = FiniteNumberInput();
    let terminiGapInput = FiniteNumberInput();

    spacingInput.value = defaultSpacing.toString();
    terminiGapInput.value = defaultTerminiGap.toString();

    let spacingField = TextInputField('Spacing', spacingInput);
    let terminiGapField = TextInputField('Termini Gap', terminiGapInput);

    $(spacingField).css({ margin: '14px 0px 0px 14px' });
    $(terminiGapField).css({ margin: '10px 0px 0px 14px' });

    let circularizeButton = DarkSolidButton();

    $(circularizeButton)
      .text('Circularize');

    $(circularizeButton).on('click', () => {
      let spacing = Number.parseFloat(spacingInput.value);
      let terminiGap = Number.parseFloat(terminiGapInput.value);

      spacing = isFiniteNumber(spacing) ? spacing : defaultSpacing;
      terminiGap = isFiniteNumber(terminiGap) ? terminiGap : defaultTerminiGap;

      targetApp.drawing.beforeMovingBases();

      circularize(targetApp.getSelectedBasesSorted(), { spacing, terminiGap });

      targetApp.drawing.basesMoved();
    });

    let circularizeSection = document.createElement('div');

    $(circularizeSection)
      .append(circularizeButton)
      .append(spacingField)
      .append(terminiGapField)
      .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

    $(circularizeSection).css({ marginTop: '56px' });

    return circularizeSection;
  }
}
