import {useStore} from '../services/store.service'
import {Navigate} from 'react-router-dom'
import React from 'react'

const ProtectedRoute = ({children}) => {
    const {isAuth} = useStore(state => state)

    if (!isAuth) {
        return <Navigate to="/login"/>
    }

    return <>{children}</>
}

export default React.memo(ProtectedRoute)
