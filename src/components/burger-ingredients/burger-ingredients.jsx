import React, { useMemo } from "react";
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientType from '../ingredients-type/ingredients-type'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGREDIENT_RETAILS, CLOSE_INGREDIENT_RETAILS } from "../../services/actions/burger";

function BurgerIngredients() {
    const dispatch = useDispatch()
    const {ingredients, ingredientDetails} = useSelector(store => store.burger)
    const [current, setCurrent] = React.useState('bun')
    
    const bunRef = React.useRef();
    const sauceRef = React.useRef();
    const mainRef = React.useRef();

    const handleChangeTab = (e) => {
        const containerTop = e.target.getBoundingClientRect().top;
        const bunTop = bunRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const mainTop = mainRef.current.getBoundingClientRect().top;

        if (Math.abs(bunTop - containerTop) > Math.abs(sauceTop - containerTop)) {
            if (Math.abs(sauceTop - containerTop) > Math.abs(mainTop - containerTop)) {
                setCurrent('main')
            }
            else {
                setCurrent('sauce')
            }
        }
        else {
            setCurrent('bun')
        }
    }

    const openIngredientModal = (ingredient) => {
        dispatch({
            type: OPEN_INGREDIENT_RETAILS,
            details: ingredient
        })
    }

    const closeIngredientModal = () => {
        dispatch({ type: CLOSE_INGREDIENT_RETAILS})
    }


    const buns = useMemo(() => ingredients.filter((item) => {
        return item.type === 'bun'
    }))
    const sauces = useMemo(() => ingredients.filter((item) => {
        return item.type === 'sauce'
    }))
    const main = useMemo(() => ingredients.filter((item) => {
        return item.type === 'main'
    }))



    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинка</Tab>
            </div>
                
            <ul className={`custom-scroll ${styles.container}`} onScroll={handleChangeTab}>
                <IngredientType ref={bunRef} type={buns} name='Булки' openIngredientModal={openIngredientModal} />
                <IngredientType ref={sauceRef} type={sauces} name='Соусы' openIngredientModal={openIngredientModal}  />
                <IngredientType ref={mainRef} type={main} name='Начинка' openIngredientModal={openIngredientModal}  />
            </ul>
            {
            ingredientDetails &&
            <Modal closeModal={closeIngredientModal}>
              <IngredientDetails data={ingredientDetails} closeModal={closeIngredientModal} />
            </Modal>
            }
        </section>
    )
}


export default BurgerIngredients