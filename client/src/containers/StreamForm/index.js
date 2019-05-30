import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'UI/Input';

class StreamForm extends Component {
  submitHandler = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submitHandler)} className="ui form error">
        <Field name="title" component={Input} label="Enter Title" />
        <Field name="description" component={Input} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
 
  return errors;
}


export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);