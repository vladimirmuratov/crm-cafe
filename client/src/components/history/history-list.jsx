import HistoryListItem from './history-list-item.jsx'
import {useStore} from '../../services/store.service'
import {ModalHistory} from '../modals/modal-history'
import React, {useEffect, useRef, useState} from 'react'

const HistoryList = () => {
    const modalRef = useRef(null)
    const [modalInstance, setInstance] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const {orders, getAllOrders, isLoading, noMoreOrders} = useStore(state => state)

    useEffect(() => {
        const instance = M.Modal.init(modalRef.current)
        setInstance(instance)
    }, [])

    const getCurrentOrder = (id) => {
        const foundOrder = orders.find(item => item._id === id)
        const amount = foundOrder.list.reduce((acc, item) => acc + (item.quantity * item.cost), 0)
        const payload = {
            numOrder: foundOrder.order,
            list: foundOrder.list,
            amount
        }
        setSelectedOrder(payload)
    }

    const onOpenModal = (id) => {
        getCurrentOrder(id)
        modalInstance.open()
    }

    const onCloseModal = () => {
        modalInstance.close()
        modalInstance.destroy()
    }

    const getAmount = (list = []) => {
        return list.reduce((acc, item) => acc + (item.quantity * item.cost), 0)
    }

    const loadOrderMore = () => getAllOrders()

    return (
        <>
            {orders.length
                ? (<table className="highlight mb2">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Сумма</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.map((item) => (
                        <HistoryListItem
                            key={item._id}
                            id={item._id}
                            onOpen={onOpenModal}
                            orderNumber={item.order}
                            datestamp={item.date}
                            amount={getAmount(item.list)}
                        />))}
                    </tbody>
                </table>)
                : (<div className="center">
                    <h4>История заказов пуста</h4>
                </div>)
            }

            <div className="center mb2">
                <button
                    onClick={loadOrderMore}
                    className={`btn waves-effect grey darken-1 btn-small ${noMoreOrders ? 'hide' : ''}`}
                    disabled={isLoading}
                >
                    Загрузить еще
                </button>
            </div>

            <ModalHistory ref={modalRef} onClose={onCloseModal} order={selectedOrder}/>
        </>
    )
}

export default React.memo(HistoryList)
