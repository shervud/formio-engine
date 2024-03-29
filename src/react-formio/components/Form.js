import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventEmitter from 'eventemitter2';
import AllComponents from 'formiojs/components';
import Components from 'formiojs/components/Components';
import FormioForm from 'formiojs/Form';
Components.setComponents(AllComponents);

export default class Form extends Component {
  static propTypes = {
    src: PropTypes.string,
    url: PropTypes.string,
    form: PropTypes.object,
    submission: PropTypes.object,
    options: PropTypes.shape({
      readOnly: PropTypes.bool,
      noAlerts: PropTypes.bool,
      i18n: PropTypes.object,
      template: PropTypes.string,
    }),
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    onChange: PropTypes.func,
    onCustomEvent: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitDone: PropTypes.func,
    onFormLoad: PropTypes.func,
    onError: PropTypes.func,
    onRender: PropTypes.func,
    formioform: PropTypes.any
  };

  static getDefaultEmitter() {
    return new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
  }

  componentDidMount = () => {
    const {options = {}, src, url, form} = this.props;

    if (!options.events) {
      options.events = Form.getDefaultEmitter();
    }

    if (src) {
      this.createPromise = new (this.props.formioform || FormioForm)(this.element, src, options).render().then(formio => {
        this.formio = formio;
        this.formio.src = src;
      });
    }
    if (form) {
      this.createPromise = new (this.props.formioform || FormioForm)(this.element, form, options).render().then(formio => {
        this.formio = formio;
        this.formio.form = form;
        if (url) {
          this.formio.url = url;
        }

        return this.formio;
      });
    }

    this.initializeFormio();
  };

  componentWillUnmount = () => {
    if (this.formio !== undefined) {
      this.formio.destroy(true);
    }
  };

  initializeFormio = () => {
    if (this.createPromise) {
      this.createPromise.then(() => {
        if (this.props.submission) {
          this.formio.submission = this.props.submission;
        }
        //this.formio.hideComponents([]); (From Components.js)
        this.formio.on('prevPage', this.emit('onPrevPage'));
        this.formio.on('nextPage', this.emit('onNextPage'));
        this.formio.on('change', this.emit('onChange'));
        this.formio.on('customEvent', this.emit('onCustomEvent'));
        this.formio.on('formLoad', this.emit('onFormLoad'));
        this.formio.on('submit', this.emit('onSubmit'));
        this.formio.on('submitDone', this.emit('onSubmitDone'));
        this.formio.on('error', this.emit('onError'));
        this.formio.on('render', this.emit('onRender'));
      });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const {options = {}, src, form, submission} = this.props;

    if (!options.events) {
      options.events = Form.getDefaultEmitter();
    }

    if (src !== nextProps.src) {
      this.createPromise = new (this.props.formioform || FormioForm)(this.element, nextProps.src, options).render().then(formio => {
        this.formio = formio;
        this.formio.src = nextProps.src;
      });
      this.initializeFormio();
    }
    if (form !== nextProps.form) {
      this.createPromise = new (this.props.formioform || FormioForm)(this.element, nextProps.form, options).render().then(formio => {
        this.formio = formio;
        this.formio.form = nextProps.form;
      });
      this.initializeFormio();
    }

    if (submission !== nextProps.submission && this.formio) {
      this.formio.submission = nextProps.submission;
    }
  };

  render = () => {
    return <div ref={element => this.element = element} />;
  };

  emit = (funcName) => {
    return (...args) => {
      if (this.props.hasOwnProperty(funcName) && typeof (this.props[funcName]) === 'function') {
        this.props[funcName](...args);
      }
    };
  };
}
