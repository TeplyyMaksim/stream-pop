import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStreams, deleteStream } from 'store/actions/streams';
import Modal from 'UI/Modal';

class StreamList extends Component {
  state = {
    deletingStream: null,
  }

  componentDidMount() {
    this.props.getStreams();
  }

  renderAdminButtons(stream) {
    const { currentUserId } = this.props;
    const { userId, id: streamId } = stream

    if (userId !== currentUserId) {
      return null;
    }

    return (
      <div className="right floated content">
        <Link
          to={`/streams/edit/${streamId}`}
          className="ui button primary"
        >
          Edit
        </Link>
        <button
          className="ui button negative"
          onClick={() => this.setState({ deletingStream: stream })}
        >
          Delete
        </button>
      </div>
    );
  }

  renderList = () => {
    const { streams } = this.props;

    return streams.map((stream) => {
      const { id, title, description } = stream

      return (
        <div className="item" key={id}>
          {this.renderAdminButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link
              to={`/streams/${id}`}
              className="header"
            >
              {title}
            </Link>
            <div className="description">{description}</div>
          </div>
        </div>
      )
    })
  }

  renderCreateButton = () => {
    const { isSignedIn } = this.props;
    
    if (!isSignedIn) {
      return null;
    }

    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    )
  }

  closeDeleteModalHandler = () => {
    this.setState({ deletingStream: null });
  }

  deleteStreamHandler = async () => {
    const {
      state: { deletingStream: { id } },
      props: { deleteStream },
    } = this;

    await deleteStream(id);
    this.setState({ deletingStream: null });
  }

  renderDeleteModal = () => {
    const {
      state: { deletingStream },
      closeDeleteModalHandler,
      deleteStreamHandler,
    } = this;
    const title = deletingStream && deletingStream.title;

    return (
      <Modal
        header="Delete Stream"
        actions={(
          <>
            <button
              className="ui primary button"
              onClick={deleteStreamHandler}
            >
              Delete
            </button>
            <button
              className="ui button"
              onClick={closeDeleteModalHandler}
            >
              Cancel
            </button>
          </>
        )}
        isOpened={Boolean(deletingStream)}
        onClose={closeDeleteModalHandler}
      >
        Are you sure you want to delete the stream with title "{title}"
      </Modal>
    );
  }


  render() {
    const {
      renderDeleteModal,
      renderCreateButton,
      renderList,
    } = this;

    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {renderList()}
        </div>
        {renderCreateButton()}
        {renderDeleteModal()}
      </div>
    )
  }
};

const mapStateToProps = ({ streams, auth: { userId, isSignedIn } }) => ({
  streams: Object.values(streams),
  currentUserId: userId,
  isSignedIn,
});


const mapDispatchToProps = {
  getStreams,
  deleteStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
