import {useNavigate} from 'react-router-dom'
import React from 'react'

const CategoryCard = ({_id, name, imageSrc}) => {
    const navigate = useNavigate()

    return (
        <div className="card waves-effect pointer" onClick={() => navigate(`/order/create/${_id}`)}>
            <div className="center">
                <img src={`https://crm-cafe.onrender.com/${imageSrc}`} alt="pic" className="responsive-img order-img"/>
            </div>
            <div className="card-content center p10">
                <h5 className="m0">{name}</h5>
            </div>
        </div>
    )
}

export default React.memo(CategoryCard)
