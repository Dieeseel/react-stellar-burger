import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { 
    HomePage, 
    NotFound404, 
    LoginPage, 
    RegistrationPage, 
    ProfilePage, 
    ForgotPasswordPage, 
    ResetPasswordPage, 
    FeedPage, 
    ProfileOrderPage,
    OrderDetailsPage 
 } from "./pages"
import { OnlyAuth, OnlyUnAuth } from "./components/protected-route"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "./services/actions/auth"
import Modal from "./components/modal/modal"
import { IngredientDetailPage } from "./pages/ingredient-details-page/ingredientDetailsPage"
import IngredientDetails from "./components/ingredient-details/ingredient-details"
import { OrderDetails } from "./components/order-details/order-details"

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    const closeIngredientModal = () => {
        navigate('/')
    }

    const closeOrderModal = () => {
        navigate(-1)
    }

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-in" element={<OnlyUnAuth element={<LoginPage />} />} />
                <Route path="/register" element={<OnlyUnAuth element={<RegistrationPage />} />} />
                <Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />} />
                <Route path="/profile/orders" element={<OnlyAuth element={<ProfileOrderPage />} />} />
                <Route path="/profile/orders/:id" element={<OnlyAuth element={<OrderDetailsPage />} />} />
                <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
                <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:id" element={<OrderDetailsPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/*" element={<NotFound404 />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal closeModal={closeIngredientModal}>
                            <IngredientDetails closeModal={closeIngredientModal} />
                        </Modal>
                    } />
                    <Route path="/profile/orders/:id" element={
                        <Modal closeModal={closeOrderModal}>
                            <OrderDetails closeModal={closeOrderModal} />
                        </Modal>
                    } />
                    <Route path="/feed/:id" element={
                        <Modal closeModal={closeOrderModal}>
                            <OrderDetails closeModal={closeOrderModal} />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
        
    )
}