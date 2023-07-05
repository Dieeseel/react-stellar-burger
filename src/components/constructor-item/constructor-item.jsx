import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'

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

export default ConstructorItem  