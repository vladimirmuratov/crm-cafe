import {SiteLayout} from '../layouts/site-layout'
import {useStore} from '../services/store.service'
import OverviewGainCard from '../components/overview/overview-gain-card'
import OverviewOrdersCard from '../components/overview/overview-orders-card'
import moment from 'moment'
import React from "react";

const OverviewPage = () => {
    const {overviewGain, overviewOrders} = useStore(state => state)

    return (
        <SiteLayout>
            <div className="page-title">
                <h4>Обзор за вчера ({moment().subtract(1, 'days').format('DD.MM.YYYY')})</h4>
            </div>

            <div className="row">

                {overviewGain ? <OverviewGainCard gain={overviewGain}/> : <></>}

                {overviewOrders ? <OverviewOrdersCard orders={overviewOrders}/> : <></>}

            </div>
        </SiteLayout>
    )
}

export default React.memo(OverviewPage)
