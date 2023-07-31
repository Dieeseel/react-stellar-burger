import React, { useMemo, useContext } from "react";
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientType from '../ingredients-type/ingredients-type'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { IngredientsDataContext } from "../../services/dataContext";

function BurgerIngredients() {
    const ingridientsData = useContext(IngredientsDataContext)

    const [current, setCurrent] = React.useState('one')
    const [ingredientDetails, setIngredientDetails] = React.useState({isClosed: true, data: null})
    const openIngredientModal = (ingredient) => {
        setIngredientDetails({isClosed: false, data: ingredient})
    }

    const closeIngredientModal = () => {
        setIngredientDetails({...ingredientDetails, isClosed: true})
    }


    const buns = useMemo(() => ingridientsData.filter((item) => {
        return item.type === 'bun'
    }))
    const sauces = useMemo(() => ingridientsData.filter((item) => {
        return item.type === 'sauce'
    }))
    const main = useMemo(() => ingridientsData.filter((item) => {
        return item.type === 'main'
    }))


    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинка</Tab>
            </div>
                
            <ul className={`custom-scroll ${styles.container}`}>
                <IngredientType type={buns} name='Булки' openIngredientModal={openIngredientModal} />
                <IngredientType type={sauces} name='Соусы' openIngredientModal={openIngredientModal}  />
                <IngredientType type={main} name='Начинка' openIngredientModal={openIngredientModal}  />
            </ul>
            {
            !ingredientDetails.isClosed &&
            <Modal closeModal={closeIngredientModal}>
              <IngredientDetails data={ingredientDetails.data} closeModal={closeIngredientModal} />
            </Modal>
            }
        </section>
    )
}


export default BurgerIngredients