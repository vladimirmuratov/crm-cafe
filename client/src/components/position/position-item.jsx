import React from 'react'

const PositionItem = ({_id, name, cost, onDelete, onSelected}) => {
    return (
        <a
            onClick={() => onSelected(_id)}
            className="collection-item collection-item-icon"
        >
            <span>
                {name} <strong>{cost} руб.</strong>
            </span>
            <span onClick={(e) => onDelete(_id, e)}>
                <i className="material-icons">delete</i>
            </span>
        </a>
    )
}

export default React.memo(PositionItem)
