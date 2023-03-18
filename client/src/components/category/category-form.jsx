import PositionList from '../position/position-list'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import React, {useEffect, useRef, useState} from 'react'
import {useStore} from '../../services/store.service'
import {useNavigate} from 'react-router-dom'

const CategoryForm = ({category}) => {
    const navigate = useNavigate()
    const {createCategory, updateCategory, removeCategory, getPositions} = useStore(state => state)
    const titleStatus = category ? 'Изменить' : 'Добавить'
    const btnStatus = category ? 'Сохранить изменения' : 'Создать'
    const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm()
    const fileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const onSubmit = data => {
        const payload = {
            ...data,
            image
        }

        if (category) {
            updateCategory(category._id, payload)
            navigate('/categories')
        } else {
            createCategory(payload)
            navigate('/categories')
        }
    }

    const trigger = () => {
        fileRef.current.click()
    }

    const onFileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const onDeleteCategory = (id) => {
        const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${category.name}" ?`)

        if (decision) {
            removeCategory(id)
            navigate('/categories')
        }
    }

    useEffect(() => {
        M.updateTextFields()
    })

    useEffect(() => {
        if (category) {
            getPositions(category._id)

            setValue('name', category.name, {
                shouldValidate: true,
                shouldDirty: true
            })

            category?.imageSrc && setImagePreview(`https://crm-cafe.onrender.com/${category.imageSrc}`)
        }
    }, [category])

    return (
        <>
            <div className="page-title">
                <h4>
                    <Link to="/categories">Категории</Link>
                    <i className="material-icons">keyboard_arrow_right</i>
                    {titleStatus} категорию
                </h4>
                <span>
            {category && <button className="btn btn-small red" onClick={() => onDeleteCategory(category._id)}>
                <i className="material-icons">delete</i>
            </button>}
          </span>
            </div>

            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col s12 l6">
                    <div className="input-field">
                        <input
                            id="name"
                            type="text"
                            {...register("name", {
                                required: "name is required"
                            })}
                            aria-invalid={errors.name ? "true" : "false"}
                            className={`${errors.name && 'invalid'}`}
                        />
                        <label htmlFor="name">Название</label>
                        {errors.name &&
                            <span className="helper-text red-text text-darken-2">{errors.name?.message}</span>}
                    </div>

                    <div>
                        <input
                            onChange={onFileUpload}
                            ref={fileRef}
                            type="file"
                            style={{display: "none"}}
                        />
                        <button
                            onClick={trigger}
                            type="button"
                            className="waves-effect waves-light btn orange lighten-2 mb2"
                        >
                            <i className="material-icons left">backup</i>
                            Загрузить изображение
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="waves-effect waves-light btn"
                            disabled={isSubmitting}
                        >
                            {btnStatus}
                        </button>
                    </div>
                </div>

                <div className="col s12 l4 center">
                    {imagePreview &&
                        <img className="responsive-img" style={{height: 200}} src={imagePreview} alt="pic"/>}
                </div>
            </form>

            {category?._id && <PositionList categoryId={category._id}/>}

        </>
    )
}

export default React.memo(CategoryForm)
