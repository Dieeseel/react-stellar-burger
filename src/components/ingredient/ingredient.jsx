import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

function Ingredient ({ data, openIngredientModal }) {
    const dispatch = useDispatch()
    const { burgerConstructor } = useSelector(store => store.burger)
    const counter = burgerConstructor.filter(item => item._id === data._id).length
    const buns = burgerConstructor.find(item => {return item.type === 'bun'})
    
    const [, dragRef] = useDrag({
        type: "ingredients",
        item: data,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    
    return (
        <li ref={dragRef} className={styles.ingredient} onClick={() => {openIngredientModal(data)}}>
            <img src={data.image} alt="" />
            <p className={`text text_type_digits-default mb-1 mt-1 ${styles.price}`}>
                {data.price}
                <CurrencyIcon type="primary" />
            </p>
            <h3 className={`text text_type_main-default mt-1 ${styles.title}`}>{data.name}</h3>
            {
                counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />
            }
        </li>
    )
}

Ingredient.propTypes = {
    data: ingredientPropType.isRequired,
    openIngredientModal: PropTypes.func.isRequired
}

export default Ingredient