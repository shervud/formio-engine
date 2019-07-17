import React from 'react';
import { connect } from 'react-redux';
import { Formio, saveForm, selectError, FormEdit, Errors } from '../../react-formio';
import {push} from 'connected-react-router';
import _get from 'lodash/get';

const Create = props => {
  const options = {
    builder: {
      basic: false,
      advanced: false,
      layout: false, data: false,
      customBasic: {
        title: 'My list',
        default: true,
        weight: 0,
        components: {
          textfield: true,
          textarea: true,
          email: true,
          phoneNumber: true,
          hidden: true,
          phoneNumberNew: true
        }
      }
    }
  };

  return (
    <div>
      <h2>Create Form</h2>
      <hr />
      <Errors errors={props.errors} />
      <FormEdit {...props} optionsSSS={options} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    form: {display: 'form'},
    saveText: 'Create Form',
    errors: selectError('form', state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveForm: (form) => {
      Formio.accessInfo()
        .then(access => {
          const anonymous = _get(access, 'roles.anonymous._id', '');
          let newForm = {
            ...form,
            tags: ['common'],
            submissionAccess: [{
              roles: [anonymous],
              type: "create_own"
            }]
          };
          dispatch(saveForm('form', newForm, (err, form) => {
            if (!err) {
              dispatch(push(`/form/${form._id}`))
            }
          }))
        });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)
