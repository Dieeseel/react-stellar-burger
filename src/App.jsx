import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { HomePage, NotFound404, LoginPage, RegistrationPage, ProfilePage, ForgotPasswordPage, ResetPasswordPage } from "./pages"
import { ProtectedRouteElement } from "./components/protected-route"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./services/actions/auth"
import Modal from "./components/modal/modal"
import { IngredientDetailPage } from "./pages/ingredientDetailsPage"
import IngredientDetails from "./components/ingredient-details/ingredient-details"
import { CLOSE_INGREDIENT_DETAILS } from "./services/actions/burger"

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const background = location.state && location.state.background
    const { ingredientDetails } = useSelector(store => store.ingredientsDetailModal)
    
    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    const closeIngredientModal = () => {
        dispatch({ type: CLOSE_INGREDIENT_DETAILS })
        navigate('/')
    }

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<ProtectedRouteElement element={<HomePage />} />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
                <Route path="/*" element={<NotFound404 />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal closeModal={closeIngredientModal}>
                            <IngredientDetails data={ingredientDetails} closeModal={closeIngredientModal} />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
        
    )
}