import {useEffect, useRef, useState} from 'react'
import FilterHistory from '../components/history/filter-history'

export const HistoryLayout = ({children}) => {
    const tooltipRef = useRef(null)
    const [isFilterShow, setFilter] = useState(false)

    useEffect(() => {
        M.Tooltip.init(tooltipRef.current)
    }, [])

    return (
        <>
            <div className="page-title">
                <h4>История заказов</h4>
                <button
                    ref={tooltipRef}
                    onClick={() => setFilter(!isFilterShow)}
                    className="btn btn-small js-filter tooltipped"
                    data-tooltip="Открыть фильтр"
                    data-position="left"
                >
                    <i className="material-icons">filter_list</i>
                </button>
            </div>

            <FilterHistory isShow={isFilterShow}/>

            {children}
        </>
    )
}
