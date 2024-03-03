import type { App } from './App';

import { linearize } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

const defaultSpacing = 9;

export class LinearizeSection {
  static for(targetApp: App) {
    let spacingInput = FiniteNumberInput();

    spacingInput.value = defaultSpacing.toString();

    let spacingField = TextInputField('Spacing', spacingInput);

    $(spacingField).css({ margin: '14px 0px 0px 14px' });

    let linearizeButton = DarkSolidButton();

    linearizeButton.textContent = 'Linearize';

    linearizeButton.addEventListener('click', () => {
      let spacing = Number.parseFloat(spacingInput.value);

      spacing = isFiniteNumber(spacing) ? spacing : defaultSpacing;

      targetApp.drawing.beforeMovingBases();
      linearize(targetApp.getSelectedBasesSorted(), { spacing });
      targetApp.drawing.basesMoved();
    });

    let linearizeSection = document.createElement('div');

    $(linearizeSection)
      .append(linearizeButton)
      .append(spacingField)
      .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

    $(linearizeSection).css({ marginTop: '30px' });

    return linearizeSection;
  }
}
