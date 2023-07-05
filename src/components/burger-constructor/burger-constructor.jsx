import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";


function BurgerConstructor({ constructorData }) {
    return (
        <section className={styles.section}>
            <div className={`pt-25 ${styles.container}`}>
                <div className='pl-8'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                    {
                        constructorData.map((item) => {
                            if(item.type != 'bun') {
                                return <ConstructorItem data={item} key={item._id} />  
                            }  
                        }) 
                    }
                </div>
                <div className='pl-8'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            
            <div className={styles.order}>
                <p className='text text_type_digits-medium'>
                    610
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}


BurgerConstructor.propTypes = {
    constructorData: PropTypes.arrayOf(ingredientPropType).isRequired
}
export default BurgerConstructor