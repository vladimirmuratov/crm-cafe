import OrderTable from './order-table.jsx'
import {useParams} from 'react-router-dom'
import {useStore} from '../../services/store.service.js'
import React, {useEffect} from 'react'

const OrderPositions = () => {
    const {getPositions, positions} = useStore(state => state)
    const {categoryId} = useParams()

    useEffect(() => {
        if (categoryId) {
            getPositions(categoryId)
        }
    }, [categoryId])

    return (
        <>
            {positions.length
                ? <OrderTable positions={positions}/>
                : ''
            }
        </>
    )
}

export default React.memo(OrderPositions)
