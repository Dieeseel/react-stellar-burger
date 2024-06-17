import { FC } from "react";
import styles from './modal-overlay.module.css'
import { ICloseModalProps } from '../../services/types/data';

const ModalOverlay: FC<ICloseModalProps> = ({closeModal}) => {
    return (
        <div className={styles.main} onClick={closeModal}></div>
    )
}


export default ModalOverlay