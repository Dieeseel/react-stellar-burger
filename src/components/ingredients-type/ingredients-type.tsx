import React from 'react'
import styles from './ingredients-type.module.css'
import Ingredient from '../ingredient/ingredient'
import { IIngredientsType } from '../../services/types/data'
import { RefObject } from 'react'


const IngredientType = React.forwardRef<HTMLDivElement, IIngredientsType>(({ type, name }, ref) => {
    return (
        <li className='mb-10' ref={ref as RefObject<HTMLLIElement>}>
            <h2 className='text text_type_main-medium'>{name}</h2>
            <ul className={styles.ingredients}>
                {type.map((item) => {
                    return <Ingredient data={item} key={item._id} />
                })}
            </ul>
        </li>
    )
})

export default IngredientType