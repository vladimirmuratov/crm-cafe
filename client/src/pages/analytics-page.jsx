import {SiteLayout} from '../layouts/site-layout'
import React, {useEffect, useRef, useState} from 'react'
import {useStore} from '../services/store.service'
import {Chart} from 'chart.js'

const AnalyticsPage = () => {
    const {analytics} = useStore(state => state)
    const gainRef = useRef(null)
    const orderRef = useRef(null)

    const [gainInstance, setGainInstance] = useState(null)
    const [orderInstance, setOrderInstance] = useState(null)

    const [gainCtx, setGainCtx] = useState(null)
    const [orderCtx, setOrderCtx] = useState(null)

    const [gainConfig, setGainConfig] = useState(null)
    const [orderConfig, setOrderConfig] = useState(null)

    useEffect(() => {
        setGainInstance(gainRef.current)
        setOrderInstance(orderRef.current)
    }, [])

    useEffect(() => {
        if (analytics) {
            setGainConfig({
                label: 'Выручка',
                color: 'rgb(255, 99, 132)',
                labels: analytics.chart.map(item => item.label),
                data: analytics.chart.map(item => item.gain),
            })

            setOrderConfig({
                label: 'Заказы',
                color: 'rgb(54, 162, 235)',
                labels: analytics.chart.map(item => item.label),
                data: analytics.chart.map(item => item.order),
            })
        }
    }, [analytics])

    useEffect(() => {
        if (gainInstance && orderInstance) {
            setGainCtx(gainInstance.getContext('2d'))
            gainInstance.height = '300px'

            setOrderCtx(orderInstance.getContext('2d'))
            orderInstance.height = '300px'
        }
    }, [gainInstance, orderInstance])

    useEffect(() => {
        if (gainCtx && gainConfig) {
            new Chart(gainCtx, createChartConfig(gainConfig))
        }
    }, [gainCtx, gainConfig])

    useEffect(() => {
        if (orderCtx && orderConfig) {
            new Chart(orderCtx, createChartConfig(orderConfig))
        }
    }, [gainCtx, gainConfig])

    function createChartConfig({label, data, labels, color}) {
        return {
            type: 'line',
            options: {
                responsive: true
            },
            data: {
                labels,
                datasets: [
                    {
                        label,
                        data,
                        borderColor: color,
                        steppedLine: false,
                        fill: false
                    }
                ]
            }
        }
    }

    return (
        <SiteLayout>
            <div className="page-title">
                <h4>Аналитика</h4>
            </div>

            <div className="average-price">
                <p>Средний чек <strong>{analytics.average.toLocaleString()} р.</strong></p>
            </div>

            <div className="analytics-block pb3">
                <h5>Выручка</h5>
                <canvas ref={gainRef}></canvas>
            </div>

            <div className="analytics-block">
                <h5>Заказы</h5>
                <canvas ref={orderRef}></canvas>
            </div>
        </SiteLayout>
    )
}

export default React.memo(AnalyticsPage)
