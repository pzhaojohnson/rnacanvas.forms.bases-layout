import type { App } from './App';

import { flipX, flipY } from '@rnacanvas/bases-layout';

import { flipSelfX, flipSelfY } from '@rnacanvas/bases-layout';

import * as $ from 'jquery';

import * as styles from './FlipSection.css';

import { LightSolidButton } from './LightSolidButton';

export class FlipSection {
  static for(targetApp: App) {
    let flipXButton = LightSolidButton();
    let flipYButton = LightSolidButton();
    let flipSelfXButton = LightSolidButton();
    let flipSelfYButton = LightSolidButton();

    $(flipXButton).text('X');
    $(flipYButton).text('Y');
    $(flipSelfXButton).text('Self-X');
    $(flipSelfYButton).text('Self-Y');

    $(flipXButton).on('click', () => {
      targetApp.drawing.beforeMovingBases();
      flipX(targetApp.getSelectedBasesSorted());
      targetApp.drawing.basesMoved();
    });

    $(flipYButton).on('click', () => {
      targetApp.drawing.beforeMovingBases();
      flipY(targetApp.getSelectedBasesSorted());
      targetApp.drawing.basesMoved();
    });

    $(flipSelfXButton).on('click', () => {
      targetApp.drawing.beforeMovingBases();
      flipSelfX(targetApp.getSelectedBasesSorted());
      targetApp.drawing.basesMoved();
    });

    $(flipSelfYButton).on('click', () => {
      targetApp.drawing.beforeMovingBases();
      flipSelfY(targetApp.getSelectedBasesSorted());
      targetApp.drawing.basesMoved();
    });

    let flipLabel = document.createElement('p');

    $(flipLabel)
      .addClass(styles.flipLabel)
      .text('Flip:');

    let flipSection = document.createElement('div');

    $(flipSection)
      .addClass(styles.flipSection)
      .append(flipLabel, flipXButton, flipYButton, flipSelfXButton, flipSelfYButton);

    return flipSection;
  }
}
