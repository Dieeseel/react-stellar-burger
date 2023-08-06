import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import { ingredientPropType } from '../../utils/prop-types'
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/burger';
import {useDrag, useDrop} from "react-dnd";


function ConstructorItem({ data, index }) {
    const dispatch = useDispatch()
    const ref = React.useRef(null);
    const removeItem = () => {
        dispatch({
            type: REMOVE_INGREDIENT,
            uuid: data.uuid,
            price: data.price
        })
    }
    
    const moveIngredient = (dragIndex, moveIndex) => {
        dispatch({ 
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            moveIndex: moveIndex
        })
    }


    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {index}
    });

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    dragRef(dropTarget(ref));


    return (
        <div className={styles.container} ref={ref}>
            <DragIcon className={styles.drag} type="primary" />
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={() => {removeItem()}}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    data: ingredientPropType.isRequired
}

export default ConstructorItem  