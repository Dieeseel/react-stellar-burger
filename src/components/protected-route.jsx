import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const ProtectedRouteElement = ({ element }) => {
    const { userData, isCheckedAuth } = useSelector(store => store.auth)

    if(!isCheckedAuth) {
        return null
    }
    return userData ? element : <Navigate to="/sign-in" replace/>;
}