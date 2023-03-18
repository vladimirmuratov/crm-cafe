import {useStore} from './services/store.service'
import React, {useEffect} from 'react'

function App({children}) {
    const {
        init,
        error,
        message,
        clear,
        getAllCategories,
        token,
        getAllOrders,
        getOverview,
        getAnalytics
    } = useStore(state => state)

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (token) {
            getAllCategories()
            getAllOrders()
            getOverview()
            getAnalytics()
        }
    }, [token])

    useEffect(() => {
        if (error) {
            M.toast({html: error})
            clear('error')
        }
    }, [error])

    useEffect(() => {
        if (message) {
            M.toast({html: message})
            clear('message')
        }
    }, [message])

    return (
        <>
            {children}
        </>
    )
}

export default React.memo(App)
