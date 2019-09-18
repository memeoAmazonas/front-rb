import React from "react";
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import '../css/components/modalContainer.css';

class ModalContainer  extends React.PureComponent {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta seguro que desea eliminar el usuario <strong>{this.props.username}</strong> ?
                </Modal.Body>
                <Modal.Footer>
                    <button style={{backgroundColor: 'red' }} className="btn-modal-delete" onClick={this.props.handleClose}>
                        Cancel
                    </button>
                    <button  className="btn-modal-delete" onClick={this.props.deleteUser}>
                        Delete user
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ModalContainer.defaultProps = {
    username: '',
    show: false,
    deleteUser: null,
    handleClose: null,
};

ModalContainer.propTypes = {
    username: PropTypes.string,
    show: PropTypes.bool,
    deleteUser: PropTypes.func,
    handleClose: PropTypes.func,
}
export default ModalContainer;
