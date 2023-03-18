import {SiteLayout} from '../layouts/site-layout'
import {HistoryLayout} from '../layouts/history-layout'
import HistoryList from '../components/history/history-list'
import React from 'react'

const HistoryPage = () => {

    return (
        <SiteLayout>
            <HistoryLayout>
                <HistoryList/>
            </HistoryLayout>
        </SiteLayout>
    )
}

export default React.memo(HistoryPage)
