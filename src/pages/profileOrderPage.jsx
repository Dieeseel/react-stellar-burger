import styles from './profileOrderPage.module.css'
import AppHeader from '../components/app-header/app-header'
import { ProfileNavigation } from '../components/profile-navigation/profile-navigation'
import { ProfileOrders } from '../components/profile-orders/profile-orders'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { wsConnectionStart } from '../services/actions/wsActions'
import { getCookie } from '../services/cookie'


export const ProfileOrderPage = () => {
    const dispatch = useDispatch()
    const userOrders = useSelector(store => store.orders.ordersData)
    const accessToken = getCookie('accessToken')
    const url = `wss://norma.nomoreparties.space/orders?token=${accessToken}`

    useEffect(() => {
        dispatch(wsConnectionStart(url))
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader />
            {
                userOrders &&
                <main className={styles.main}>
                    <ProfileNavigation />
                    <ProfileOrders ordersData={userOrders.orders}/>
                </main>
            }
        </div>
    )
}