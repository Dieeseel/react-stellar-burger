import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


export const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
    const location = useLocation();
    const { userData, isCheckedAuth } = useSelector(store => store.auth)

    if (!isCheckedAuth) {
        return null
    }
    if (onlyUnAuth && userData) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !userData) {
        return <Navigate to="/sign-in" state={{ from: location }} />;
    }


    return element
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);