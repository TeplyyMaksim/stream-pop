import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('#modal')

class Modal extends Component {
  constructor(props) {
    super(props);
    this.wrapper = document.createElement('div');
    this.state = { isOpened: null };
  }

  updateModalShow = () => {
    const { isOpened } = this.props;
    const { isOpened: isOpenedPrev } = this.state;

    if (isOpened === isOpenedPrev) {
      return;
    }

    modalRoot[isOpened ? 'appendChild' : 'removeChild'](this.wrapper);
    this.setState({ isOpened });
  }

  componentDidUpdate() {
    this.updateModalShow();
  }
  componentDidMount() {
    const {
      props: {
        isOpened
      },
      wrapper,
    } = this;

    if (isOpened) {
      modalRoot.appendChild(wrapper);
    }

    this.setState({ isOpened });
  }
  componentWillUnmount() {
    const {
      props: {
        isOpened
      },
      wrapper,
    } = this;

    if (isOpened) {
      modalRoot.removeChild(wrapper);
    }
  }

  renderHeader = () => {
    const { header } = this.props;

    return header
      ? (
        <div className="header">{header}</div>
      )
      : null;
  }

  renderContent = () => {
    const { content, children } = this.props;
    
    return (
      <div className="content">
        {content || children || null}
      </div>
    );
  }
  
  renderActions = () => {
    const { actions } = this.props;

    return actions
      ? (<div className="actions">{actions}</div>)
      : null;
  }

  render() {
    const {
      props: { onClose },
      state: { isOpened },
      renderHeader,
      renderContent,
      renderActions,  
    } = this;


    return isOpened
      ? ReactDOM.createPortal(
        (
          <div
            className="ui dimmer modals visible active"
            onClick={onClose}
          >
            <div
              className="ui standart modal visible active"
              onClick={(event) => { event.stopPropagation() }}
            >
              {renderHeader()}
              {renderContent()}
              {renderActions()}
            </div>
          </div>
        ),
        this.wrapper
      )
      : null;
  }
};

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  header: PropTypes.node,
  content: PropTypes.node,
  actions: PropTypes.node,
};

Modal.defaultProps = {
  onClose: noop
}

export default Modal;