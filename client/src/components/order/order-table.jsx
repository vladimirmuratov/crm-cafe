import OrderTableItem from './order-table-item'
import React, {useEffect, useRef} from 'react'
import {ModalOrder} from '../modals/modal-order'
import {useStore} from '../../services/store.service'

const OrderTable = ({positions}) => {
    const modalRef = useRef(null)
    const {setModalInstance, setOrder, order, modalInstance, deleteOrderItem, createOrder} = useStore(state => state)

    useEffect(() => {
        if (modalRef.current) {
            setModalInstance(M.Modal.init(modalRef.current))
        }
    }, [modalRef.current])

    const onCloseModal = () => {
        modalInstance.close()
        modalInstance.destroy()
    }

    const onDelete = (name) => {
        deleteOrderItem(name)
    }

    const onCreate = () => {
        createOrder()
        onCloseModal()
    }


    return (
        <>
            <table className="highlight">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>Количество</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>

                {positions.map(p => (
                    <OrderTableItem
                        key={p._id}
                        {...p}
                        addToOrder={setOrder}
                    />
                ))}

                </tbody>
            </table>
            <ModalOrder
                ref={modalRef}
                order={order}
                onClose={onCloseModal}
                onDelete={onDelete}
                onCreate={onCreate}
            />
        </>
    )
}

export default React.memo(OrderTable)
