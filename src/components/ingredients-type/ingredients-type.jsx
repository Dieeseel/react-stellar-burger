import styles from './ingredients-type.module.css'
import Ingredient from '../ingredient/ingredient'


function IngredientType({ type, name, openIngredientModal }) {
    return (
        <li className='mb-10'>
            <h2 className='text text_type_main-medium'>{name}</h2>
            <ul className={styles.ingredients}>
                {type.map((item) => {
                    return <Ingredient data={item} key={item._id} openIngredientModal={openIngredientModal} />
                })}
            </ul>
        </li>
    )
}

export default IngredientType