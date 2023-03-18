import {useStore} from '../../services/store.service'
import PositionItem from './position-item'
import {Loader} from '../Loader'
import {ModalPosition} from '../modals/modal-position'
import React, {useEffect, useRef, useState} from 'react'

const PositionList = ({categoryId}) => {
    const modalRef = useRef()
    const {positions, isLoading, removePosition, createPosition, updatePosition} = useStore(state => state)
    const [instance, setInstance] = useState(null)
    const [position, setPosition] = useState(null)
    const [positionId, setPositionId] = useState(null)

    useEffect(() => {
        setInstance(M.Modal.init(modalRef.current))
    }, [])

    useEffect(() => {
        if (positionId) {
            setPosition(positions.find(el => el._id === positionId))
        }
    }, [positionId])

    const onOpenModal = () => {
        if (!positionId) {
            setPosition(null)
        }
        instance.open()
    }

    const onCloseModal = () => {
        setPosition(null)
        setPositionId(null)
        instance.close()
        instance.destroy()
    }

    const onSubmit = (id = undefined, data) => {
        const payload = {
            ...data,
            category: categoryId
        }

        if (!positionId) {
            createPosition(payload)
        }
        if (positionId) {
            updatePosition(id, payload)
        }
    }

    const onDelete = (id, e) => {
        e.stopPropagation()
        const decision = window.confirm('Вы уверены что хотите удалить позицию?')
        if (decision) {
            removePosition(id)
        }
    }

    const onSelectedPosition = (id) => {
        setPositionId(id)
        onOpenModal()
    }

    return (
        <>
            <div className="row">
                <div className="col s12">
                    <div className="page-subtitle">
                        <h4>Позиции:</h4>
                        <button
                            onClick={onOpenModal}
                            className="waves-effect waves-light btn grey darken-1 btn-small modal-trigger"
                            data-target="modal1"
                        >
                            Добавить позицию
                        </button>
                    </div>

                    {isLoading
                        ? <Loader/>
                        : (<div className="collection">
                            {positions.length
                                ? positions.map(item => (
                                    <PositionItem
                                        key={item._id}
                                        {...item}
                                        onDelete={onDelete}
                                        onSelected={onSelectedPosition}
                                    />
                                ))
                                : (<div className="center">
                                    <h4>В категории позиций пока нет</h4>
                                </div>)
                            }
                        </div>)
                    }
                </div>
            </div>

            <ModalPosition
                ref={modalRef}
                onClose={onCloseModal}
                onSubmit={onSubmit}
                position={position}
            />

        </>
    )
}

export default React.memo(PositionList)
