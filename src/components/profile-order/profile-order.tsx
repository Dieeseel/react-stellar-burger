import styles from './profile-order.module.css'
import { useMemo, FC } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../services/types/data'
import { IOrderElement } from '../../services/types/data'

export const ProfileOrder: FC<IOrderElement> = ({orderData, ingredientsData}) => {
    const location = useLocation()
    const ingredientsId = orderData.ingredients

    const orderIngredients = useMemo(() => 
        ingredientsData.filter(item => ingredientsId.includes(item._id))
        .sort((a) => {
            return a.type === 'bun' ? -1 : 0
          }), [ingredientsData]
    )

    const totalPrice = useMemo(() => {
        if (orderIngredients) {
            return orderIngredients.reduce((previousValue: number, item: TIngredient) => {
                        return previousValue + item.price
                   }, 0)
        }
    }, [orderIngredients])
    

    return (
        <li>
            <Link to={`/profile/orders/${orderData.number}`} state={{ background: location }} className={`pl-6 pr-6 pb-6 pt-6 ${styles.wrapper}`}>
                <div className={styles.inner}>
                    <p className='text text_type_digits-default'>{`#${orderData.number}`}</p>
                    <p className='text text_type_main-default text_color_inactive'>
                        <FormattedDate date={new Date(orderData.createdAt)} />
                    </p>
                </div>
                <div className={styles.text}>
                    <h2 className={`text text_type_main-medium ${styles.name}`}>{orderData.name}</h2>
                    <p className={`text text_type_main-default ${orderData.status === 'done' ? styles.done : ''}`}>
                        {
                            orderData.status === 'done' ? 'Выполнен' 
                            : orderData.status === 'creates' ? 'Готовится'
                            : 'Создается'
                        }
                    </p>
                </div>
                <div className={styles.details}>
                    <ul className={styles.ingredients}>
                        {
                            orderIngredients.slice(0, 6).map((item, index) => {
                                return index !== 5 ? 
                                    <li className={styles.container} key={item._id} style={{zIndex: Math.abs(6 - index)}}>
                                        <img src={item.image_mobile} className={styles.image} alt="Ингредиент"/>
                                    </li>
                                    : 
                                    <li className={styles.container} key={item._id} style={{zIndex: Math.abs(6 - index)}} >
                                        <img src={item.image_mobile} className={styles.lastImage} alt="Ингредиент"/>
                                        <p className={`text text_type_digits-default ${styles.counter}`}>{`+${orderIngredients.length - 5}`}</p>
                                    </li>
                            })
                        }
                    </ul>
                    <p className={`text text_type_digits-default ${styles.price}`}>
                        {totalPrice} <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </li>
    )
}