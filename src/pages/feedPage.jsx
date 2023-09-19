import styles from './feedPage.module.css'
import AppHeader from '../components/app-header/app-header'
import { useDispatch, useSelector } from 'react-redux'
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/wsActions'
import { useEffect, useMemo } from 'react'
import { FeedOrders } from '../components/feed-orders/feed-orders'
import { StatusDetails } from '../components/status-details/status-details'


export const FeedPage = () => {
    const dispatch = useDispatch()
    const allOrders = useSelector(store => store.orders.ordersData)
    const url = 'wss://norma.nomoreparties.space/orders/all'

    useEffect(() => {
        dispatch(wsConnectionStart(url))
    }, [])
    
    return (
        <div className={styles.app}>
            <AppHeader />
            {
                allOrders && 
                <main className={styles.main}>
                    <h1 className='text text_type_main-large'>Лента заказов</h1>
                    <div className={styles.wrapper}>
                        <FeedOrders ordersData={allOrders.orders}/>
                        <StatusDetails ordersData={allOrders} />
                    </div>
                </main>
            }
        </div>
    )
}