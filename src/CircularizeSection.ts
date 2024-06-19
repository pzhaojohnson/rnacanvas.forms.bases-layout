import type { Nucleobase } from './Nucleobase';

import type { LiveSet } from './LiveSet';

import type { BasesLayoutFormOptions } from './BasesLayoutFormOptions';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

import { circularize } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

const defaultSpacing = 10;

const defaultTerminiGap = 20;

export class CircularizeSection {
  /**
   * The actual DOM node that is the "circularize" section.
   */
  readonly domNode: HTMLDivElement;

  constructor(selectedBases: LiveSet<Nucleobase>, options?: BasesLayoutFormOptions) {
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

      options?.beforeMovingBases ? options.beforeMovingBases() : {};

      circularize([...selectedBases], { spacing, terminiGap });

      options?.afterMovingBases ? options.afterMovingBases() : {};
    });

    this.domNode = document.createElement('div');

    $(this.domNode)
      .append(circularizeButton)
      .append(spacingField)
      .append(terminiGapField)
      .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

    $(this.domNode).css({ marginTop: '56px' });
  }
}
