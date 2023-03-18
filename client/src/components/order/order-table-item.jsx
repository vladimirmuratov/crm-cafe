import React, {useState} from 'react'

const OrderTableItem = ({_id, name, cost, addToOrder}) => {
    const [quantity, setQuantity] = useState(1)

    const onSubmit = () => {
        const payload = {
            quantity,
            name,
            cost
        }
        addToOrder(payload)
        setQuantity(1)
    }

    const handleCount = (e) => {
        setQuantity(e.target.value)

        if (e.target.value <= 0) {
            setQuantity(1)
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{cost} руб.</td>
            <td>
                <div className="input-field inline order-position-input">
                    <input type="number" value={quantity} onChange={handleCount} min="1" step="1"/>
                </div>
            </td>
            <td>
                <button
                    onClick={onSubmit}
                    className="btn waves-effect wavers-light btn-small"
                >
                    Добавить
                </button>
            </td>
        </tr>
    )
}

export default React.memo(OrderTableItem)
