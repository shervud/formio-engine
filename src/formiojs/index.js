import Webform from 'formiojs/Webform';
import WebformBuilder from 'formiojs/WebformBuilder';
import Wizard from 'formiojs/Wizard';
import WizardBuilder from 'formiojs/WizardBuilder';
import editFormUtils from 'formiojs/components/base/editForm/utils';
import {Components, Formio, Utils} from 'formiojs';
import components from './components';

Components.setComponents(components);

export {
  Webform,
  WebformBuilder,
  Wizard,
  WizardBuilder,
  editFormUtils,
};
export {
  Components,
  Formio,
  Utils
};

