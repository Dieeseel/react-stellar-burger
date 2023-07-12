import styles from './ingredient-details.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';

function IngredientDetails({data, closeModal}) {
    return (
        <div className={`pl-10 pr-10 pb-15 pt-10 ${styles.container}`}>
            <div className={styles.header}>
                <h2 className='text text_type_main-large'>Детали ингредиента</h2>
                <button className={styles.button} onClick={closeModal}><CloseIcon type="primary" /></button>
            </div>
            <img className='pb-4' src={data.image_large} alt="" />
            <div className={styles.info}>
                <p className='text text_type_main-medium'>{data.name}</p>
                <ul className={styles.valuesContainer}>
                    <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                        <p className='text'>Калории, калл</p>
                        {data.calories}
                    </li>
                    <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                        <p className='text'>Белки, г</p>
                        {data.fat}
                    </li>
                    <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                        <p className='text'>Жиры, г</p>
                        {data.proteins}
                    </li>
                    <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                        <p className='text'>Углеводы, г</p>
                        {data.carbohydrates}
                    </li>
                </ul>
            </div>
        </div>
    )
}


IngredientDetails.propTypes = {
    data: ingredientPropType.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default IngredientDetails