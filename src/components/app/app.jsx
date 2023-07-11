import React from "react";
import styles from "./app.module.css";
import { urlApi, orderData } from "../../utils/data";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";


function App() {
  const [state, setState] = React.useState({
    hasError: false,
    isLoading: false,
    dataIngredients: []
  })

  const [ingredientDetails, setIngredientDetails] = React.useState({isClosed: true, data: null})
  const [orderDetails, setOrderDetails] = React.useState({isClosed: true, data: null})

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(urlApi)
        .then(res => res.json())
        .then(res => setState({ ...state, dataIngredients: res.data, isLoading: false }))
        .catch(err => {
          setState({ ...state, hasError: true, isLoading: false });
          console.log(err)
        });
    }
    getIngredients()
  }, [])


  const openIngredientModal = (ingredient) => {
    setIngredientDetails({isClosed: false, data: ingredient})
  }

  const openOrderModal = (order) => {
    setOrderDetails({isClosed: false, data: order})
  }

  const closeModal = () => {
    setIngredientDetails({...ingredientDetails, isClosed: true})
    setOrderDetails({...orderDetails, isClosed: true})
  }

  const { dataIngredients, isLoading, hasError } = state;
  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !isLoading && !hasError && dataIngredients.length &&
        <>
          <main className={styles.main}>
            <BurgerIngredients ingridientsData={dataIngredients} openIngredientModal={openIngredientModal} />
            <BurgerConstructor constructorData={dataIngredients} openOrderModal={openOrderModal} />
          </main>
          {
            !ingredientDetails.isClosed &&
            <Modal closeModal={closeModal}>
              <IngredientDetails data={ingredientDetails.data} closeModal={closeModal} />
            </Modal>
          }
          {
            !orderDetails.isClosed &&
            <Modal closeModal={closeModal}>
              <OrderDetails data={orderData} closeModal={closeModal}  />
            </Modal>
          }
        </>
      }

    </div>
  );
}

export default App;
