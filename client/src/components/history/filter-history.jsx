import React, {useEffect, useRef, useState} from 'react'
import {useStore} from '../../services/store.service'

const FilterHistory = ({isShow}) => {
    const {getFilteredOrders, getAllOrders} = useStore(state => state)
    const startRef = useRef(null)
    const endRef = useRef(null)
    const [startInstance, setStartInstance] = useState(null)
    const [endInstance, setEndInstance] = useState(null)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [order, setOrder] = useState('')
    const [error, setError] = useState('')
    const [isValid, setValid] = useState(false)

    useEffect(() => {
        setError('')
        if ((start && end) && start > end) {
            setError('Начальная дата не может быть больше конечной')
        }

        if (start || end) {
            setValid(true)
        }
    }, [start, end])

    useEffect(() => {
        if (order) {
            setValid(true)
        }
        if (order === '0') {
            setOrder('')
            setValid(false)
        }
    }, [order])

    useEffect(() => {
        const instanceStart = M.Datepicker.init(startRef.current, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            container: "body",
            autoClose: true,
            maxDate: new Date(),
            onSelect: (date) => {
                console.log('start', date)
                setStart(date)
            }
        })
        setStartInstance(instanceStart)

        const instanceEnd = M.Datepicker.init(endRef.current, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            container: "body",
            autoClose: true,
            maxDate: new Date(),
            onSelect: (date) => {
                console.log('end', date)
                setEnd(date)
            }
        })
        setEndInstance(instanceEnd)

    }, [])

    const onOpenStart = () => startInstance.open()
    const onOpenEnd = () => endInstance.open()

    const onSubmit = () => {
        const params = {}
        if (order) {
            params.order = order
        }
        if (start) {
            params.start = new Date(start)
        }
        if (end) {
            params.end = new Date(end)
        }

        getFilteredOrders(params)

        if (!order && !start && !end) {
            getAllOrders()
        }
    }

    return (
        <div className={`filter js-filter-block ${!isShow ? 'hide' : ''}`}>
            <div className="fr">
                <div className="col order">
                    <div className="input-field inline order-position-input">
                        <input
                            name="order"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            type="number"
                            id="number"
                            min="0"
                            step="1"
                        />
                        <label htmlFor="number">Номер заказа</label>
                    </div>
                </div>
                <div className="col filter-pickers">
                    <div className="input-field">
                        <input
                            ref={startRef}
                            name="start"
                            onFocus={onOpenStart}
                            type="text"
                            className={`${error ? 'invalid' : ''}`}
                        />
                        <label>Начало</label>
                        {error
                            ? <span className="helper-text red-text text-darken-2">{error}</span>
                            : ''
                        }
                    </div>

                    <div className="input-field">
                        <input
                            ref={endRef}
                            name="end"
                            onFocus={onOpenEnd}
                            type="text"
                        />
                        <label>Конец</label>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn waves-effect wavers-light btn-small"
                disabled={!!error || !isValid}
            >
                Применить фильтр
            </button>
        </div>
    )
}

export default React.memo(FilterHistory)
