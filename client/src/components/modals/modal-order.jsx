import React from 'react'

export const ModalOrder = React.forwardRef(({order, onClose, onDelete, onCreate}, ref) => {
    const amount = order.reduce((acc, item) => acc + (item.quantity * item.cost), 0)

    return (
        <div ref={ref} id="explore-order" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4 className="mb1">Ваш заказ</h4>
                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {order.map((el, idx) => (
                        <tr key={idx}>
                            <td>{el.name}</td>
                            <td>{el.quantity}</td>
                            <td>&#8381;{el.cost}</td>
                            <td onClick={() => onDelete(el.name)}><i className="material-icons pointer">delete</i></td>
                        </tr>
                    ))}
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
                    Отмена
                </button>
                <button
                    onClick={onCreate}
                    className="modal-action btn waves-effect"
                    disabled={!order.length}
                >
                    Подтвердить
                </button>
            </div>
        </div>
    )
})
