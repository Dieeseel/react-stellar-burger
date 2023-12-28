import styles from './feed-order.module.css'
import {useMemo, FC} from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { IOrderElement } from '../../services/types/data'

export const FeedOrder: FC<IOrderElement> = ({orderData, ingredientsData}) => {
    const ingredientsId = orderData.ingredients
    const location = useLocation()

    const orderIngredients = useMemo(() => 
        ingredientsData.filter(item => ingredientsId.includes(item._id))
        .sort((a) => {
            return a.type === 'bun' ? -1 : 0
          }), [ingredientsData]
    )

    const totalPrice = orderIngredients.reduce((previousValue, item) => {
        return previousValue + item.price
    }, 0)

    return (
        <li>
            <Link to={`/feed/${orderData.number}`} state={{ background: location }} className={`pl-6 pr-6 pb-6 pt-6 ${styles.wrapper}`}>
                <div className={styles.inner}>
                    <p className='text text_type_digits-default'>{`#${orderData.number}`}</p>
                    <p className='text text_type_main-default text_color_inactive'>
                        <FormattedDate date={new Date(orderData.createdAt)} />
                    </p>
                </div>
                <h2 className={`text text_type_main-medium ${styles.name}`}>{orderData.name}</h2>
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