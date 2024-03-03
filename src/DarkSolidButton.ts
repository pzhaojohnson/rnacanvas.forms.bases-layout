import * as $ from 'jquery';

import * as styles from './DarkSolidButton.css';

export function DarkSolidButton() {
  let darkSolidButton = document.createElement('button');

  $(darkSolidButton)
    .addClass(styles.darkSolidButton);

  return darkSolidButton;
}
