import type { Drawing } from './Drawing';

import type { Nucleobase } from './Nucleobase';

import type { LiveSet } from './LiveSet';

import type { BasesLayoutFormOptions } from './BasesLayoutFormOptions';

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

/**
 * Returns a bases-layout form for the target app.
 *
 * The returned bases-layout form will have CSS styles for fixed positioning
 * (and a relatively high Z-index),
 * meaning that it can be shown to the user just by appending it to the document body
 * (and also hidden by removing it from the document body).
 */
export function BasesLayoutForm(targetDrawing: Drawing, selectedBases: LiveSet<Nucleobase>, options?: BasesLayoutFormOptions) {
  let numSelectedBasesView = new NumSelectedBasesView(selectedBases);

  let centroidSection = new CentroidSection(selectedBases, options);
  let moreCoordinatesSection = new MoreCoordinatesSection(selectedBases, options);
  let directionSection = new DirectionSection(selectedBases, options);
  let flipSection = FlipSection(selectedBases, options);
  let linearizeSection = LinearizeSection(selectedBases, options);
  let straightenButton = StraightenButton(selectedBases, options);
  let circularizeSection = new CircularizeSection(selectedBases, options);
  let roundSection = RoundSection(selectedBases, options);
  let stemmifySection = StemmifySection(selectedBases, options);
  let radializeSection = RadializeSection(targetDrawing, selectedBases, options);

  let layoutControls = document.createElement('div');

  $(layoutControls).addClass(styles.layoutControls);

  $(layoutControls)
    .append(centroidSection.domNode)
    .append(moreCoordinatesSection.domNode)
    .append(directionSection.domNode)
    .append(flipSection)
    .append(linearizeSection)
    .append(straightenButton)
    .append(circularizeSection.domNode)
    .append(roundSection)
    .append(stemmifySection)
    .append(radializeSection);

  let content = document.createElement('div');

  $(content)
    .append(numSelectedBasesView.domNode)
    .append(layoutControls)
    .css({ margin: '21px 0px 0px 18px' })
    .css({ pointerEvents: 'none' });

  let basesLayoutForm = document.createElement('div');

  $(basesLayoutForm).addClass(styles.basesLayoutForm);

  $(basesLayoutForm)
    .append(Header())
    .append(content);

  let refreshableComponents = [numSelectedBasesView, centroidSection, moreCoordinatesSection, directionSection];

  let refresh = () => {
    refreshableComponents.forEach(component => component.refresh());

    if ([...selectedBases].length == 0) {
      $(basesLayoutForm).addClass(styles.noBasesSelected);
    } else {
      $(basesLayoutForm).removeClass(styles.noBasesSelected);
    }
  };

  let drawingObserver = new MutationObserver(() => refresh());
  drawingObserver.observe(targetDrawing.domNode, { attributes: true, childList: true, characterData: true, subtree: true });

  selectedBases.addEventListener('change', () => refresh());

  let closeButton = CloseButton();

  $(closeButton).on('click', () => basesLayoutForm.remove());

  // place on top of everything else
  // (to make sure close button is clickable)
  $(basesLayoutForm)
    .append(closeButton);

  return basesLayoutForm;
}
