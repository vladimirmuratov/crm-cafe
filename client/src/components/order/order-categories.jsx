import CategoryCard from './category-card.jsx'
import {useStore} from '../../services/store.service'
import {ModalOrder} from '../modals/modal-order'
import React, {useRef, useEffect} from 'react'

const OrderCategories = () => {
    const modalRef = useRef(null)
    const {categories, order, modalInstance, setModalInstance, deleteOrderItem, createOrder} = useStore(state => state)

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
            <div className="frow order-row">
                {categories.length
                    ? categories.map(cat => <CategoryCard key={cat._id} {...cat}/>)
                    : ''
                }
            </div>
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

export default React.memo(OrderCategories)
