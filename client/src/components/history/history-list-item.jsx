import moment from 'moment'
import React from 'react'

const HistoryListItem = ({id, orderNumber, datestamp, amount, onOpen}) => {
    moment.locale('ru')
    const date = moment(datestamp).format('DD.MM.YYYY')
    const time = moment(datestamp).format('HH:mm')

    return (
        <tr>
            <td>{orderNumber}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{amount.toLocaleString()} руб.</td>
            <td>
                <button
                    onClick={() => onOpen(id)}
                    className="btn btn-small modal-trigger grey darken-1"
                    data-target="order-list"
                >
                    <i className="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
    )
}

export default React.memo(HistoryListItem)
