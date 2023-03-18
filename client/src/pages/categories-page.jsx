import {SiteLayout} from '../layouts/site-layout'
import {Link, useNavigate} from 'react-router-dom'
import {useStore} from '../services/store.service'
import {Loader} from '../components/Loader'
import React from 'react'

const CategoriesPage = () => {
    const navigate = useNavigate()
    const {categories, isLoading} = useStore(state => state)

    return (
        <SiteLayout>
            <div className="page-title">
                <h4>Категории</h4>
                <button
                    className="waves-effect waves-light btn grey darken-1"
                    onClick={() => navigate('/categories/new')}
                >
                    Добавить категорию
                </button>
            </div>
            {isLoading
                ? <Loader/>
                : categories.length
                    ? (<div className="row">
                        <div className="col s12">
                            <div className="collection">
                                {categories.map(({_id, name, imageSrc}) => (
                                    <Link
                                        key={_id}
                                        to={`/categories/${_id}`}
                                        className="collection-item"
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>)
                    : (<div className="center">
                        <h3>Категорий пока нет</h3>
                    </div>)
            }

        </SiteLayout>
    )
}

export default React.memo(CategoriesPage)
