import React from "react";
import { orderData } from "../../utils/data";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item'
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ constructorData }) {
    const [orderDetails, setOrderDetails] = React.useState({isClosed: true, data: null})

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

    const openOrderModal = (order) => {
        setOrderDetails({isClosed: false, data: order})
    }
    
    const closeOrderModal = () => {
    setOrderDetails({...orderDetails, isClosed: true})
    }

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
                <Button htmlType="button" type="primary" size="large" onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </div>
            {
                !orderDetails.isClosed &&
                <Modal closeModal={closeOrderModal}>
                    <OrderDetails data={orderData} closeModal={closeOrderModal}  />
                </Modal>
            }
        </section>
    )
}


BurgerConstructor.propTypes = {
    constructorData: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}


export default BurgerConstructor