import {Link, useParams} from 'react-router-dom'
import {useStore} from '../services/store.service'

export const OrderLayout = ({children}) => {
    const {categoryId} = useParams()
    const {modalInstance, order} = useStore(state => state)

    const onOpenModal = () => modalInstance.open()

    return (
        <>
            <div className="page-title">
                <h4>
                    <Link to="/order">Заказ</Link>
                    {categoryId && (
                        <>
                            <i className="material-icons">keyboard_arrow_right</i>
                            <span>Добавить продукцию</span>
                        </>
                    )}
                </h4>
                <button
                    onClick={onOpenModal}
                    className="waves-effect btn grey darken-1 modal-trigger"
                    data-target="explore-order"
                    disabled={!order.length}
                >
                    Завершить
                </button>
            </div>
            {children}
        </>
    )
}
