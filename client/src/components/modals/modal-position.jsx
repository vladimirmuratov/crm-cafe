import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'

export const ModalPosition = React.forwardRef(({
                                                       onClose,
                                                       onSubmit,
                                                       position = null,
                                                   }, ref) => {
    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm()
    const titleStatus = position ? 'Изменить' : 'Добавить'
    const submitHandler = (data) => {
        onSubmit(position?._id, data)
        reset()
        onClose()
    }

    useEffect(() => {
        if (position) {
            setValue('name', position.name)
            setValue('cost', position.cost)
            M.updateTextFields()
        }else {
            reset()
        }
    }, [position])

    return (
        <form ref={ref} id="modal1" className="modal" onSubmit={handleSubmit(submitHandler)}>
            <div className="modal-content">
                <h4 className="mb1">{titleStatus} позицию</h4>
                <div className="input-field">
                    <input
                        id="pos-name"
                        type="text"
                        {...register("name", {
                            required: "name is required",
                            minLength: {
                                value: 3,
                                message: 'min 3 symbols'
                            }
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                        className={`${errors.name && 'invalid'}`}
                    />
                    <label htmlFor="pos-name">Название</label>
                    {errors.name &&
                        <span className="helper-text red-text text-darken-2">{errors.name?.message}</span>}
                </div>
                <div className="input-field">
                    <input
                        id="pos-cost"
                        type="number"
                        {...register("cost", {
                            required: "cost is required"
                        })}
                        aria-invalid={errors.cost ? "true" : "false"}
                        className={`${errors.cost && 'invalid'}`}
                    />
                    <label htmlFor="pos-cost">Цена</label>
                    {errors.cost &&
                        <span className="helper-text red-text text-darken-2">{errors.cost?.message}</span>}
                </div>
            </div>
            <div className="modal-footer">
                <button
                    onClick={onClose}
                    type="button"
                    className="modal-action waves-effect waves-black btn-flat"
                >
                    Отмена
                </button>
                <button type="submit" className="modal-action btn waves-effect">Сохранить</button>
            </div>
        </form>
    )
})
