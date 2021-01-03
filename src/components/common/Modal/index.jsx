import React from 'react'
import ReactModal from 'react-modal';

import './styles.scss';

ReactModal.setAppElement('#root');

class Modal extends React.Component {
  render() {
    const { edittingTodo } = this.props;

    return (
      <ReactModal
        closeTimeoutMS={400}
        isOpen={this.props.modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.props.modalClose}
        style={
          {
            content: { color: 'black', width: '500px', height: 'fit-content', margin: '0 auto', padding: '0' }
          }
        }
      >
        <div className="modal__header">
          <h2 className="modal__title">
            Editting
          </h2>
        </div>

        <div className="modal__body">
          <form className="modal__form" onSubmit={this.props.modalSubmit}>
            <input
              type="text"
              className="modal__form_input form-control"
              value={edittingTodo.value}
              autoFocus
              onChange={this.props.modalInputChange}
            />
          </form>
          <p className="modal__form_max">
            {edittingTodo.value ? edittingTodo.value.length : 0} / {this.props.maxValue}
          </p>
        </div>

        <div className="modal__footer">
          <button onClick={this.props.modalSubmit} className="btn btn-outline-success btn-sm">OK</button>
          <button onClick={this.props.modalClose} className="btn btn-outline-danger btn-sm ml-2">Close</button>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
