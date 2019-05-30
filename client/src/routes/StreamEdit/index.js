import React, { Component } from 'react';
import { pick } from 'lodash';
import { connect } from 'react-redux';
import { getStream, editStream } from 'store/actions/streams';
import StreamForm from 'containers/StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    const {
      getStream,
      match: { params: { id } },
    } = this.props;

    getStream(id);
  }

  submitHandler = (formValues) => {
    const {
      editStream,
      match: { params: { id } },
    } = this.props;

    editStream(id, formValues);
  }

  render() {
    const { stream } = this.props;
    
    if (!stream) {
      return (
        <div>
          Loading
        </div>
      );
    }
    
    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm
          initialValues={pick(stream, 'title', 'description')}
          onSubmit={this.submitHandler}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = {
  getStream, editStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
