import React, {FunctionComponent} from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import { ingredientPropType } from '../../utils/prop-types'
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../services/constants/constatnts';
import { useDrag, useDrop } from "react-dnd";
import { IConstructorItem } from '../../services/types/data';
import { moveIngredientAction } from '../../services/actions/constructor';
import { TIngredient } from '../../services/types/data';

const ConstructorItem: FunctionComponent<IConstructorItem> = ({ ingredient, index }) => {
    const dispatch = useDispatch()
    const ref = React.useRef(null);
    const removeItem = () => {
        dispatch({
            type: REMOVE_INGREDIENT,
            uuid: ingredient.uuid,
            price: ingredient.price
        })
    }
    
    const moveIngredient = (dragIndex: number, moveIndex: number) => {
        dispatch(moveIngredientAction(dragIndex, moveIndex))
    }


    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {index}
    });

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item: TIngredient & {index: number}) => {
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
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {removeItem()}}
            />
        </div>
    )
}

export default ConstructorItem  