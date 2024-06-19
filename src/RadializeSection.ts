import type { Drawing } from './Drawing';

import type { Nucleobase } from './Nucleobase';

import type { LiveSet } from './LiveSet';

import type { BasesLayoutFormOptions } from './BasesLayoutFormOptions';

import { radialize } from '@rnacanvas/bases-layout';

import { isFiniteNumber } from '@rnacanvas/value-check';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { FiniteNumberInput } from './FiniteNumberInput';

import { TextInputField } from './TextInputField';

type BasePair = [Nucleobase, Nucleobase];

const defaultSpacing = 20;

const defaultBasePairSpacing = 10;

const defaultHairpinLoopSpacing = 10;

export function RadializeSection(targetDrawing: Drawing, selectedBases: LiveSet<Nucleobase>, options?: BasesLayoutFormOptions) {
  let spacingInput = FiniteNumberInput();
  let basePairSpacingInput = FiniteNumberInput();
  let hairpinLoopSpacingInput = FiniteNumberInput();

  spacingInput.value = defaultSpacing.toString();
  basePairSpacingInput.value = defaultBasePairSpacing.toString();
  hairpinLoopSpacingInput.value = defaultHairpinLoopSpacing.toString();

  let spacingField = TextInputField('Base-Pair Length', spacingInput);
  let basePairSpacingField = TextInputField('Base-Pair Spacing', basePairSpacingInput);
  let hairpinLoopSpacingField = TextInputField('Hairpin Loop Spacing', hairpinLoopSpacingInput);

  $(spacingField).css({ margin: '14px 0px 0px 14px' });
  $(basePairSpacingField).css({ margin: '10px 0px 0px 14px' });
  $(hairpinLoopSpacingField).css({ margin: '10px 0px 0px 14px' });

  let radializeButton = DarkSolidButton();

  $(radializeButton).text('Radialize');

  $(radializeButton).on('click', () => {
    let spacing = Number.parseFloat(spacingInput.value);
    let basePairSpacing = Number.parseFloat(basePairSpacingInput.value);
    let hairpinLoopSpacing = Number.parseFloat(hairpinLoopSpacingInput.value);

    spacing = isFiniteNumber(spacing) ? spacing : defaultSpacing;
    basePairSpacing = isFiniteNumber(basePairSpacing) ? basePairSpacing : defaultBasePairSpacing;
    hairpinLoopSpacing = isFiniteNumber(hairpinLoopSpacing) ? hairpinLoopSpacing : defaultHairpinLoopSpacing;

    let selectedBasesSet = new Set([...selectedBases]);

    let basePairs: BasePair[] = [...targetDrawing.secondaryBonds]
      .filter(sb => selectedBasesSet.has(sb.base1) && selectedBasesSet.has(sb.base2))
      .map(sb => [sb.base1, sb.base2]);

    options?.beforeMovingBases ? options.beforeMovingBases() : {};
    radialize([...selectedBases], basePairs, { spacing, basePairSpacing, hairpinLoopSpacing });
    options?.afterMovingBases ? options.afterMovingBases() : {};
  });

  let radializeSection = document.createElement('div');

  $(radializeSection)
    .append(radializeButton)
    .append(spacingField)
    .append(basePairSpacingField)
    .append(hairpinLoopSpacingField)
    .css({ display: 'flex', flexDirection: 'column', alignItems: 'start' });

  $(radializeSection).css({ marginTop: '40px' });

  return radializeSection;
}
