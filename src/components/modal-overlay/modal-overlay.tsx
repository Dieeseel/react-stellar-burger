import styles from './modal-overlay.module.css'
import { ICloseModalProps } from '../../services/types/data';

function ModalOverlay({closeModal}: ICloseModalProps) {
    return (
        <div className={styles.main} onClick={closeModal}></div>
    )
}


export default ModalOverlay