import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import { ingredientPropType } from '../../utils/prop-types'
import PropTypes from "prop-types";

function ConstructorItem({ data }) {
    return (
        <div className={styles.container}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    data: ingredientPropType.isRequired
}

export default ConstructorItem  