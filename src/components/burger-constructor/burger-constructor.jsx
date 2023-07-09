import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";


function BurgerConstructor({ constructorData }) {
    const bun = 'bun'
    const ingridientsList = constructorData.filter((item) => {
        if (item.type != bun) {
            return item  
        } 
    })
    const ingredientsPrice = ingridientsList.reduce((previousValue, item) => {
        return previousValue + item.price
    }, 0)
    const totalPrice = ingredientsPrice + constructorData[0].price * 2

    return (
        <section className={styles.section}>
            <div className={`pt-25 ${styles.container}`}>
                <div className='pl-8'>
                    <ConstructorElement
                        type="top"
                        isLocked
                        text={constructorData[0].name}
                        price={constructorData[0].price}
                        thumbnail={constructorData[0].image}
                    />
                </div>
                <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                    {
                        constructorData.map((item) => {
                            if (item.type != bun) {
                                return <ConstructorItem data={item} key={item._id} />  
                            }  
                        }) 
                    }
                </div>
                <div className='pl-8'>
                    <ConstructorElement
                        type="bottom"
                        isLocked
                        text={constructorData[0].name}
                        price={constructorData[0].price}
                        thumbnail={constructorData[0].image}
                    />
                </div>
            </div>
            
            <div className={styles.order}>
                <p className='text text_type_digits-medium'>
                    {totalPrice}
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
    constructorData: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}


export default BurgerConstructor