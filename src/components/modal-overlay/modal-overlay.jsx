import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({closetModalWithOverlay}) {
    return (
        <div className={styles.main} onClick={closetModalWithOverlay}></div>
    )
}



ModalOverlay.propTypes = {
    closetModalWithOverlay: PropTypes.func.isRequired
}

export default ModalOverlay