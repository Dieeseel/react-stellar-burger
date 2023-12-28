import AppHeader from "../../components/app-header/app-header"
import styles from './ingredientDetailsPage.module.css'
import { useSelector, useDispatch } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

export const IngredientDetailPage = () => {
    const dispatch = useDispatch()
    const { ingredients } = useSelector(store => store.ingredients)
    const { id } = useParams();
    const ingredient = ingredients.length > 0 ? ingredients.find(item => item._id === id) : undefined

    
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={`pl-10 pr-10 pb-15 pt-20 ${styles.container}`}>
                <h2 className='text text_type_main-large'>Детали ингредиента</h2>
                <img className='pb-4' src={ingredient!.image_large} alt="" />
                <div className={styles.info}>
                    <p className='text text_type_main-medium'>{ingredient!.name}</p>
                    <ul className={styles.valuesContainer}>
                        <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                            <p className='text'>Калории, калл</p>
                            {ingredient!.calories}
                        </li>
                        <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                            <p className='text'>Белки, г</p>
                            {ingredient!.fat}
                        </li>
                        <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                            <p className='text'>Жиры, г</p>
                            {ingredient!.proteins}
                        </li>
                        <li className={`text text_type_main-default text_color_inactive ${styles.value}`}>
                            <p className='text'>Углеводы, г</p>
                            {ingredient!.carbohydrates}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}