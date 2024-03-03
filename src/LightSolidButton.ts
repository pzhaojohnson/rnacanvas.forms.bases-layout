import * as $ from 'jquery';

import * as styles from './LightSolidButton.css';

export function LightSolidButton() {
  let lightSolidButton = document.createElement('button');

  $(lightSolidButton)
    .addClass(styles.lightSolidButton);

  return lightSolidButton;
}
