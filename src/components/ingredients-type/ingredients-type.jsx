import React from 'react'
import styles from './ingredients-type.module.css'
import Ingredient from '../ingredient/ingredient'


const IngredientType = React.forwardRef(({ type, name }, ref) => {
    return (
        <li className='mb-10' ref={ref}>
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