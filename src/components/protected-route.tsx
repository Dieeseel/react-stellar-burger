import { FC } from "react";
import { useSelector } from '../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRoute } from '../services/types/data';
import { IOnlyAuthElement } from '../services/types/data';


export const ProtectedRouteElement: FC<IProtectedRoute> = ({ onlyUnAuth = false, element }) => {
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
export const OnlyUnAuth = ({ element }: IOnlyAuthElement) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);