import type { App } from './App';

import * as $ from 'jquery';

import * as styles from './BasesLayoutForm.css';

import { Header } from './Header';

import { NumSelectedBasesView } from './NumSelectedBasesView';

import { CentroidSection } from './CentroidSection';

import { MoreCoordinatesSection } from './MoreCoordinatesSection';

import { DirectionSection } from './DirectionSection';

import { FlipSection } from './FlipSection';

import { LinearizeSection } from './LinearizeSection';

import { StraightenButton } from './StraightenButton';

import { CircularizeSection } from './CircularizeSection';

import { RoundSection } from './RoundSection';

import { StemmifySection } from './StemmifySection';

import { RadializeSection } from './RadializeSection';

import { CloseButton } from './CloseButton';

export class BasesLayoutForm {
  /**
   * Returns a bases-layout form for the target app.
   *
   * The returned bases-layout form will have CSS styles for fixed positioning
   * (and a relatively high Z-index),
   * meaning that it can be shown to the user just by appending it to the document body
   * (and also hidden by removing it from the document body).
   */
  static for(targetApp: App) {
    let layoutControls = document.createElement('div');

    $(layoutControls).addClass(styles.layoutControls);

    $(layoutControls)
      .append(CentroidSection.for(targetApp))
      .append(MoreCoordinatesSection.for(targetApp))
      .append(DirectionSection.for(targetApp))
      .append(FlipSection.for(targetApp))
      .append(LinearizeSection.for(targetApp))
      .append(StraightenButton.for(targetApp))
      .append(CircularizeSection.for(targetApp))
      .append(RoundSection.for(targetApp))
      .append(StemmifySection.for(targetApp))
      .append(RadializeSection.for(targetApp));

    let content = document.createElement('div');

    $(content)
      .append(NumSelectedBasesView.for(targetApp))
      .append(layoutControls)
      .css({ margin: '21px 0px 0px 18px' })
      .css({ pointerEvents: 'none' });

    let basesLayoutForm = document.createElement('div');

    $(basesLayoutForm).addClass(styles.basesLayoutForm);

    targetApp.refreshSignal.addListener(() => {
      if (targetApp.getSelectedBasesSorted().length == 0) {
        $(basesLayoutForm).addClass(styles.noBasesSelected);
      } else {
        $(basesLayoutForm).removeClass(styles.noBasesSelected);
      }
    });

    $(basesLayoutForm)
      .append(Header())
      .append(content);

    let closeButton = CloseButton();

    $(closeButton).on('click', () => basesLayoutForm.remove());

    // place on top of everything else
    // (to make sure close button is clickable)
    $(basesLayoutForm)
      .append(closeButton);

    return basesLayoutForm;
  }
}
