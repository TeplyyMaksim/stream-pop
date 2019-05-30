import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from 'store/actions/streams';
import StreamForm from 'containers/StreamForm';

class StreamCreate extends Component {
  submitHandler = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.submitHandler} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  createStream,
};

export default connect(null, mapDispatchToProps)(StreamCreate);