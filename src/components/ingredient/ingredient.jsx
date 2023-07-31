import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import { ConstructorDataContext } from '../../services/dataContext';


function Ingredient ({ data, openIngredientModal }) {
    const { constructorData, setConstructorData } = React.useContext(ConstructorDataContext)

    const addIngredient = (ingredient) => {
        if (constructorData.some(item => {return item.type === 'bun'}) && ingredient.type === 'bun') {
            return false
        }
        else {
            setConstructorData([
                ...constructorData,
                ingredient
            ])
        }
    }

    return (
        <li className={styles.ingredient} onClick={() => {addIngredient(data)}}>
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
    data: ingredientPropType.isRequired,
    openIngredientModal: PropTypes.func.isRequired
}

export default Ingredient