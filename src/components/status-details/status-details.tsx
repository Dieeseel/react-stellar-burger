import styles from './status-details.module.css'
import { useMemo } from "react";
import { IStatusDetails } from '../../services/types/data';

export const StatusDetails = ({ ordersData }: IStatusDetails) => {
    const { doneOrders, createdOrders } = useMemo(() => {
        const doneOrders = ordersData.orders.filter(item => item.status === 'done')
        const createdOrders = ordersData.orders.filter(item => item.status === 'created')
        
        return {
            doneOrders,
            createdOrders,
        };
      }, 
    [ordersData]);
    
    return (
        <section className={styles.stats}>
            <div className={styles.board}>
                <div className={styles.status}>
                    <h2 className='text text_type_main-medium'>Готовы: </h2>
                    <ul className={`custom-scroll ${styles.numbers}`}>
                        {
                            doneOrders.map((item) => {
                                return (
                                    <li key={item._id}>
                                        <p className={`text text_type_digits-default ${styles.number}`}>{item.number}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.status}>
                    <h2 className='text text_type_main-medium'>В работе</h2>
                    <ul className={`custom-scroll ${styles.numbers}`}>
                        {
                            createdOrders.map((item) => {
                                return (
                                    <li key={item._id}>
                                        <p className='text text_type_digits-default'>{item.number}</p>
                                    </li>
                                )
                            })
                        } 
                    </ul>
                </div>
            </div>
            <div className={styles.done}>
                <p className='text text_type_main-medium'>Выполнено за все время: </p>
                <p className={`text text_type_digits-large ${styles.digit}`}>{ordersData.total}</p>
            </div>
            <div className={styles.done}>
                <p className='text text_type_main-medium'>Выполнено за все время: </p>
                <p className={`text text_type_digits-large ${styles.digit}`}>{ordersData.totalToday}</p>
            </div>
        </section>
    )
}