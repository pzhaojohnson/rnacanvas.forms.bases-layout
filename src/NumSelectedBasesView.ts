import type { App } from './App';

import * as $ from 'jquery';

import * as styles from './NumSelectedBasesView.css';

/**
 * Shows the number of selected bases to the user.
 */
export class NumSelectedBasesView {
  static for(targetApp: App) {
    let numSpan = document.createElement('span');

    $(numSpan).addClass(styles.numSpan);

    let trailingText = document.createElement('span');

    let numSelectedBasesView = document.createElement('p');

    $(numSelectedBasesView)
      .addClass(styles.numSelectedBasesView)
      .append(numSpan, trailingText);

    let refresh = () => {
      // don't need to refresh if the component is not visible
      if (document.body.contains(numSelectedBasesView)) {
        let num = targetApp.getSelectedBasesSorted().length;
        numSpan.textContent = num.toString();
        trailingText.textContent = num == 1 ? ' base is selected.' : ' bases are selected.';
      }
    };

    targetApp.refreshSignal.addListener(() => refresh());

    return numSelectedBasesView;
  }
}
