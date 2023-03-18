import React from 'react'

const OverviewOrdersCard = ({orders}) => {
    const colorText = orders.isHigher ? 'green-text' : 'red-text'
    const arrowDirection = orders.isHigher ? 'arrow_upward' : 'arrow_downward'
    const statusWord = orders.isHigher ? 'выше' : 'ниже'
    return (
        <div className="col s12 l6">
            <div className="card orange lighten-2 white-text">
                <div className="card-content">
                    <span className="card-title">Заказы:</span>
                    <h3>{orders.yesterday} зак.</h3>
                    <h3 className={`${colorText} m0 mb1`}>
                        <i className="material-icons">{arrowDirection}</i>
                        {orders.percent}%
                    </h3>
                    <p>Число заказов вчера на {orders.percent}% {statusWord} среднего значения: {orders.compare} зак. в
                        день</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(OverviewOrdersCard)
