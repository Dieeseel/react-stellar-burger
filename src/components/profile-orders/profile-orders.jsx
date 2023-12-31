import styles from './profile-orders.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileOrder } from '../profile-order/profile-order'
import { getIngredients } from '../../services/actions/burger'

export const ProfileOrders = ({ ordersData }) => {
    const dispatch = useDispatch()
    const ingredientsData = useSelector(store => store.ingredients.ingredients)

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <section className={styles.orders}>
            <ul className={`custom-scroll ${styles.ordersList}`}>
                {
                    ordersData.slice(0, 50).sort((a, b) => {
                        return b.number - a.number
                    })
                    .map((item) => {
                        return <ProfileOrder ingredientsData={ingredientsData} orderData={item} key={item._id} />
                    })
                }
            </ul>
        </section>
    )
}