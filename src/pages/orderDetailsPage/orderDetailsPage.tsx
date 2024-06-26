import AppHeader from "../../components/app-header/app-header"
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './orderDetailsPage.module.css'
import { useSelector, useDispatch } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { wsConnectionStart, wsConnectionDisconnect } from "../../services/actions/wsActions";
import { getCookie } from "../../services/cookie";
import { getIngredients } from "../../services/actions/ingredients";
import { useLocation } from 'react-router-dom';

export const OrderDetailsPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { id } = useParams();
    const ordersData = useSelector(store => store.orders.ordersData)
    const ingredientsData = useSelector(store => store.ingredients.ingredients)
    const accessToken = getCookie('accessToken')
    const url = location.pathname.includes('profile') ? `wss://norma.nomoreparties.space/orders?token=${accessToken}`
        : `wss://norma.nomoreparties.space/orders/all`
    const order = ordersData ? ordersData.orders.find(item => item.number.toString() === id) : undefined

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(wsConnectionStart(url))

        return () => {
            dispatch(wsConnectionDisconnect())
        }
    }, [])

    const orderIngredients = useMemo(() => {
        if (ingredientsData.length > 0 && order) {
            return ingredientsData.filter(item => order.ingredients.includes(item._id))
                   .sort((a) => {
                        return a.type === 'bun' ? -1 : 0
                   })
        }
            
    }, [ingredientsData, order])

    const totalPrice = useMemo(() => {
        if (orderIngredients) {
            return orderIngredients && orderIngredients.reduce((previousValue, item) => {
                        return previousValue + item.price
                   }, 0)
        }
    }, [orderIngredients])
    
    const counter = useMemo(() => {
        if (order) {
            return order.ingredients.reduce(function (prevVal: {[key: string]: number}, item: string) {
                if (!prevVal[item]) {
                    prevVal[item] = 1;
                } else {
                    prevVal[item] += 1;
                }
                return prevVal;
            }, {})
        }
    }, [order])


    return (
        <div className={styles.app}>
            <AppHeader />
            {
                ordersData && order &&
                <div className={`pl-10 pr-10 pt-20 ${styles.container}`}>
                    <p className="text text_type_digits-default mb-5">{`#${order.number}`}</p>
                    <div className={styles.text}>
                        <h1 className="text text_type_main-medium">{order.name}</h1>
                        <p className={`text text_type_main-default ${order.status === 'done' ? styles.done : ''}`}>
                            {
                                order.status === 'done' ? 'Выполнен' 
                                : order.status === 'creates' ? 'Готовится'
                                : 'Создается'
                            }
                        </p>
                    </div>
                    <div className={styles.compound}>
                        <p className="text text_type_main-medium">Состав: </p>
                        <ul className={`custom-scroll ${styles.ingredients}`}>
                            {
                                orderIngredients!.map((item, index) => {
                                    return <li className={styles.ingredient} key={item._id} style={{zIndex: Math.abs(6 - index)}}>
                                                <img src={item.image_mobile} className={styles.image} alt="Ингредиент"/>
                                                <p className={`text text_type_main-default ${styles.name}`}>{item.name}</p>
                                                <p className={`text text_type_digits-default ${styles.price}`}>
                                                    {counter![item._id]} X {item.price} <CurrencyIcon type={"secondary"} />
                                                </p>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.inner}>
                        <p className='text text_type_main-default text_color_inactive'>
                            <FormattedDate date={new Date(order.createdAt)} />
                        </p>
                        <p className={`text text_type_digits-default ${styles.price}`}>
                            {totalPrice} <CurrencyIcon type="primary" />
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}