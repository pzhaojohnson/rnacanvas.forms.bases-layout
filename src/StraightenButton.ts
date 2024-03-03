import type { App } from './App';

import { straighten } from '@rnacanvas/bases-layout';

import * as $ from 'jquery';

import { DarkSolidButton } from './DarkSolidButton';

export class StraightenButton {
  static for(targetApp: App) {
    let straightenButton = DarkSolidButton();

    straightenButton.textContent = 'Straighten';

    $(straightenButton).css({ marginTop: '30px' });

    straightenButton.addEventListener('click', () => {
      targetApp.drawing.beforeMovingBases();
      straighten(targetApp.getSelectedBasesSorted());
      targetApp.drawing.basesMoved();
    });

    return straightenButton;
  }
}
