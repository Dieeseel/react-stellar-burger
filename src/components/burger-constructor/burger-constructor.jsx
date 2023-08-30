import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../services/actions/burger";
import { REMOVE_INGREDIENT, ADD_INGREDIENT, CLOSE_ORDER_MODAL } from '../../services/actions/burger';
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';


function BurgerConstructor() {
    const dispatch = useDispatch()
    const { burgerConstructor, totalPrice } = useSelector(store => store.burgerConstructor)
    const orderNumber = useSelector(store => store.order.orderNumber)
    
    const buns = burgerConstructor.find((item) => {
        return item.type === 'bun' 
    })
    const otherIngredients = burgerConstructor.filter(item => item.type != 'bun')


    const addIngredient = (ingredient) => {
        if (buns && ingredient.type === 'bun' && buns.uuid != ingredient.uuid) {
            dispatch({
                type: REMOVE_INGREDIENT,
                uuid: buns.uuid,
                price: buns.price
            })
        }
        dispatch({
            type: ADD_INGREDIENT,
            price: ingredient.price,
            ingredient: {...ingredient, uuid: uuid()}
        })
    }

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (data) => {
            addIngredient(data);
        },
        collect: (monitor) => ({
            isDrop: monitor.isOver(),
        }),
    });


    const openOrderModal = () => {
        dispatch(sendOrder(burgerConstructor.map((item) => {
            return item._id
        })))
    }

    const closeOrderModal = () => {
        dispatch({ type: CLOSE_ORDER_MODAL})
    }

    return (
        <section className={styles.section}>
            <div ref={dropTarget} className={`mt-25 ${styles.container}`}>
                <div className='pl-9'>
                    {   buns != undefined &&
                        <ConstructorElement
                            type="top"
                            isLocked
                            text={buns.name}
                            price={buns.price}
                            thumbnail={buns.image }          
                        />
                    }
                </div>
                <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                    {
                        burgerConstructor.length
                            ? otherIngredients.map((item, index) => (<ConstructorItem ingredient={item} key={item.uuid} index={index}/>)) 
                                : ( <p className={`text text_type_main-medium ${styles.text}`}>Добавьте ингрендиенты</p> )
                    }
                </div>
                <div className='pl-9'>
                    {   
                        buns != undefined &&
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            text={buns.name}
                            price={buns.price}
                            thumbnail={buns.image }          
                        />
                    }
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
                orderNumber > 0 &&
                <Modal closeModal={closeOrderModal}>
                    <OrderDetails orderNumber={orderNumber} closeModal={closeOrderModal} />
                </Modal>
            }
        </section>
    )
}



export default BurgerConstructor