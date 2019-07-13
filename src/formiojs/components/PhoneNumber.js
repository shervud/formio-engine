import TextField from 'formiojs/components/textfield/TextField';

import intlTelInput from 'intl-tel-input/build/js/intlTelInput';
import intlTelInputUtils from 'intl-tel-input/build/js/utils';

export  class PhoneNumberComponent extends TextField {
  static schema(...extend) {
    return TextField.schema({
      type: 'phoneNumberNew',
      label: 'Phone Number',
      key: 'phoneNumberNew',
      mask: false,
      inputType: 'tel',
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'Phone Number',
      icon: 'fa fa-phone-square',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#textfield',
      weight: 30,
      schema: PhoneNumberComponent.schema()
    };
  }
  
  get defaultSchema() {
    return PhoneNumberComponent.schema();
  }
  
  build() {
    super.build();
    
    const {element} = this;
    setTimeout(() => {
      const tmp = Array.from(element.children)
        .find(({id}) => id.match(/phoneNumber\d*/));
      if(tmp) {
        intlTelInput(tmp, {
          utilsScript: intlTelInputUtils
        });
      }
    }, 0)
  }
 
}
