import React from 'react'

export const ModalHistory = React.forwardRef(({onClose, order}, ref) => {
    let numOrder
    let orderList
    let amount

    if (order) {
        numOrder = order.numOrder
        orderList = order.list
        amount = order.amount
    }

    return (
        <div
            ref={ref}
            id="order-list"
            className="modal modal-fixed-footer"
        >
            <div className="modal-content">
                <h4 className="mb1">Заказ №{numOrder}</h4>
                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                    </thead>

                    <tbody>
                    {orderList?.length
                        ? orderList.map(({name, quantity, cost}) => (
                            <tr key={name}>
                                <td>{name}</td>
                                <td>{quantity}</td>
                                <td>&#8381;{cost}</td>
                            </tr>))
                        : null
                    }
                    </tbody>
                </table>
                <div className="order-summary">
                    <p>Общая стоимость <strong>{amount?.toLocaleString()} руб.</strong></p>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    onClick={onClose}
                    className="modal-action waves-effect waves-black btn-flat"
                >
                    Закрыть
                </button>
            </div>
        </div>
    )
})
