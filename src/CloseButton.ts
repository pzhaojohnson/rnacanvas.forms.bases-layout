import * as $ from 'jquery';

import * as styles from './CloseButton.css';

export function CloseButton() {
  let closeButton = document.createElement('button');

  $(closeButton)
    .addClass(styles.closeButton)
    .text('Close');

  return closeButton;
}
