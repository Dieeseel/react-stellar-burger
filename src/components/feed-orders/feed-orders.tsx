import styles from './feed-orders.module.css'
import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from '../../services/hooks'
import { FeedOrder } from '../feed-order/feed-order'
import { getIngredients } from '../../services/actions/ingredients'
import { IFeedOrders } from '../../services/types/data'

export const FeedOrders: FC<IFeedOrders> = ({ ordersData }) => {
    const dispatch = useDispatch()
    const ingredientsData = useSelector(store => store.ingredients.ingredients)

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <section className={styles.orders}>
            <ul className={`custom-scroll ${styles.ordersList}`}>
                {
                    ordersData.slice(0, 50).map((item) => {
                        return <FeedOrder ingredientsData={ingredientsData} orderData={item} key={item._id} />
                    })
                }
            </ul>
        </section>
    )
}