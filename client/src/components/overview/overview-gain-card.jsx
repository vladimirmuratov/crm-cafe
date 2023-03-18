import React from 'react'

const OverviewGainCard = ({gain}) => {
    const colorText = gain.isHigher ? 'green-text' : 'red-text'
    const arrowDirection = gain.isHigher ? 'arrow_upward' : 'arrow_downward'
    const statusWord = gain.isHigher ? 'выше' : 'ниже'

    return (
        <div className="col s12 l6">
            <div className="card light-blue lighten-2 white-text">
                <div className="card-content">
                    <span className="card-title">Выручка:</span>
                    <h3>{gain.yesterday.toLocaleString()} руб.</h3>
                    <h3 className={`${colorText} text-darken-2 m0 mb1`}>
                        <i className="material-icons">{arrowDirection}</i>
                        {gain.percent}%
                    </h3>
                    <p>Выручка вашего бизнеса вчера на {gain.percent}% {statusWord} среднего: {gain.compare} руб. в
                        день</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(OverviewGainCard)
