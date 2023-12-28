import React, { FC} from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ICloseModalProps } from '../../services/types/data';

const modalRoot = document.getElementById("react-modals");

const Modal: FC<ICloseModalProps> = ({ children, closeModal }) => {

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
                <ModalOverlay closeModal={closeModal} />
            </div>
        ),
        modalRoot as HTMLElement
    )
}


export default Modal