import styles from './order-details.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import doneIcon from '../../images/done.png';
import PropTypes from "prop-types";

function OrderDetails({data, closeModal}) {
    return (
        <div className={`pl-10 pr-10 pb-30 pt-15 ${styles.container}`}>
            <button className={styles.button} onClick={closeModal}><CloseIcon type="primary" /></button>
            <h2 className='text text_type_digits-large mb-8'>{data.orderNumber}</h2>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <img className='mb-15' src={doneIcon} alt={'doneIcon'} />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на обитальной станции</p>
        </div>
    )
}


OrderDetails.propTypes = {
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
}


export default OrderDetails