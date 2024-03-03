import type { App } from './App';

import { stemmify } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

const defaultBasePairLength = 18;

const defaultBasePairSpacing = 9;

export class StemmifySection {
  static for(targetApp: App) {
    let basePairLengthInput = FiniteNumberInput();
    let basePairSpacingInput = FiniteNumberInput();

    basePairLengthInput.value = defaultBasePairLength.toString();
    basePairSpacingInput.value = defaultBasePairSpacing.toString();

    let basePairLengthField = TextInputField('Base-Pair Length', basePairLengthInput);
    let basePairSpacingField = TextInputField('Base-Pair Spacing', basePairSpacingInput);

    $(basePairLengthField).css({ margin: '14px 0px 0px 14px' });
    $(basePairSpacingField).css({ margin: '10px 0px 0px 14px' });

    let stemmifyButton = DarkSolidButton();

    $(stemmifyButton)
      .text('Stemmify');

    $(stemmifyButton).on('click', () => {
      let basePairLength = Number.parseFloat(basePairLengthInput.value);
      let basePairSpacing = Number.parseFloat(basePairSpacingInput.value);

      basePairLength = isFiniteNumber(basePairLength) ? basePairLength : defaultBasePairLength;
      basePairSpacing = isFiniteNumber(basePairSpacing) ? basePairSpacing : defaultBasePairSpacing;

      targetApp.drawing.beforeMovingBases();
      stemmify(targetApp.getSelectedBasesSorted(), { basePairLength, basePairSpacing });
      targetApp.drawing.basesMoved();
    });

    let stemmifySection = document.createElement('div');

    $(stemmifySection)
      .append(stemmifyButton)
      .append(basePairLengthField)
      .append(basePairSpacingField)
      .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

    $(stemmifySection).css({ marginTop: '40px' });

    return stemmifySection;
  }
}
