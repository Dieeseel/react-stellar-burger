import React, { useContext, useEffect, useReducer } from "react";
import { urlApi } from "../../utils/data";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ConstructorDataContext } from '../../services/dataContext';


const initialTotalPrice = { value: 0 }

function reducer(state, action) {
    switch (action.type) {
      case "add":
        return { value: action.payload };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
}


function BurgerConstructor() {
    const {constructorData} = useContext(ConstructorDataContext)
    const [orderDetails, setOrderDetails] = React.useState({isClosed: true, data: null})
    const [totalPrice, dispatchTotalPrice] = useReducer(reducer, initialTotalPrice, undefined);

    const buns = constructorData.find((item) => {
        return item.type === 'bun' 
    })
    const otherIngredients = constructorData.filter((item) => {
        return item.type != 'bun'
    })

    const makeNewOrder = (data) => {
        return fetch(`${urlApi}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ingredients: data
            })
        })
          .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
    }
    
    useEffect(() => {
        constructorData.forEach(item => {
            if (item.type === 'bun') {
                dispatchTotalPrice({
                    type: 'add',
                    payload: totalPrice.value + item.price * 2
                })
            } 
            else {
                dispatchTotalPrice({
                    type: 'add',
                    payload: totalPrice.value + item.price
                })
            }
        });
    }, [constructorData])

    const openOrderModal = () => {
        makeNewOrder(constructorData.map((item) => {
            return item._id
        }))
        .then((res )=> {
            setOrderDetails({isClosed: false, data: res.order.number})
        })
    }

    const closeOrderModal = () => {
        setOrderDetails({...orderDetails, isClosed: true})
    }


    return (
        <section className={styles.section}>
            <div className={`pt-25 ${styles.container}`}>
                <div className='pl-8'>
                    {   
                        buns != undefined &&
                        <ConstructorElement
                            type="top"
                            isLocked
                            text={buns.name}
                            price={buns.price}
                            thumbnail={buns.image}
                        />
                    }
                </div>
                <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                    {
                        otherIngredients.map((item) => {
                            return <ConstructorItem data={item} key={item._id} />  
                        }) 
                    }
                </div>
                <div className='pl-8'>
                    {   
                        buns != undefined &&
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            text={buns.name}
                            price={buns.price}
                            thumbnail={buns.image}
                        />
                    }
                </div>
            </div>
            
            <div className={styles.order}>
                <p className='text text_type_digits-medium'>
                    {totalPrice.value}
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </div>
            {
                !orderDetails.isClosed &&
                <Modal closeModal={closeOrderModal}>
                    <OrderDetails orderNumber={orderDetails.data} closeModal={closeOrderModal}  />
                </Modal>
            }
        </section>
    )
}



export default BurgerConstructor