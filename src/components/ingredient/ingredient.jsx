import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import PropTypes from "prop-types";

function Ingredient ({ data, openIngredientModal }) {
    return (
        <li className={styles.ingredient} onClick={() => {openIngredientModal(data)}}>
            <img src={data.image} alt="" />
            <p className={`text text_type_digits-default mb-1 mt-1 ${styles.price}`}>
                {data.price}
                <CurrencyIcon type="primary" />
            </p>
            <h3 className={`text text_type_main-default mt-1 ${styles.title}`}>{data.name}</h3>
            <Counter count={1} size="default" extraClass="m-1" />
        </li>
    )
}

Ingredient.propTypes = {
    data: PropTypes.object.isRequired
}

export default Ingredient