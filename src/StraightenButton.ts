import type { Nucleobase } from './Nucleobase';

import type { LiveSet } from './LiveSet';

import type { BasesLayoutFormOptions } from './BasesLayoutFormOptions';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

import { straighten } from '@rnacanvas/bases-layout';

export function StraightenButton(selectedBases: LiveSet<Nucleobase>, options?: BasesLayoutFormOptions) {
  let straightenButton = DarkSolidButton();

  straightenButton.textContent = 'Straighten';

  $(straightenButton).css({ marginTop: '35px' });

  straightenButton.addEventListener('click', () => {
    options?.beforeMovingBases ? options.beforeMovingBases() : {};
    straighten([...selectedBases]);
    options?.afterMovingBases ? options.afterMovingBases() : {};
  });

  return straightenButton;
}
