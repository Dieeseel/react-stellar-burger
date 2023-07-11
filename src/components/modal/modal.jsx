import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";


const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, closeModal }) => {

    React.useEffect(() => {
        document.addEventListener("keydown", (evt) => {
            evt.key === 'Escape' && closeModal();
        });
        
        return () => {
            document.removeEventListener("keydown", (evt) => {
                evt.key === 'Escape' && closeModal();
            });
        };
    }, []);

    return ReactDOM.createPortal(
        (
            <div className={styles.modal}>
                <div className={styles.container}>
                    {children}
                </div>
                <ModalOverlay closetModalWithOverlay={closeModal} />
            </div>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    data: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}


export default Modal