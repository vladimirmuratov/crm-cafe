import {SiteLayout} from '../layouts/site-layout'
import {OrderLayout} from '../layouts/order-layout'
import OrderCategories from '../components/order/order-categories'
import {useLocation} from 'react-router-dom'
import OrderPositions from '../components/order/order-positions'
import React from 'react'

const OrderPage = () => {
    const location = useLocation()

    return (
        <SiteLayout>
            <OrderLayout>
                {location.pathname === '/order'
                    ? <OrderCategories/>
                    : <OrderPositions/>
                }
            </OrderLayout>
        </SiteLayout>
    )
}

export default React.memo(OrderPage)
