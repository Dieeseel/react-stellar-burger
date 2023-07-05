import React from "react";
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientType from '../ingredients-type/ingredients-type'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";

function BurgerIngredients({ ingridientsData }) {
    const [current, setCurrent] = React.useState('one')

    const buns = ingridientsData.filter((item) => {
        return item.type === 'bun'
    })
    const sauces = ingridientsData.filter((item) => {
        return item.type === 'sauce'
    })
    const main = ingridientsData.filter((item) => {
        return item.type === 'main'
    })

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинка</Tab>
            </div>
                
            <ul className={`custom-scroll ${styles.container}`}>
                <IngredientType type={buns} name='Булки'/>
                <IngredientType type={sauces} name='Соусы' />
                <IngredientType type={main} name='Начинка' />
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingridientsData: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerIngredients