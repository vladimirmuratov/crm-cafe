import {SiteLayout} from '../layouts/site-layout'
import CategoryForm from '../components/category/category-form'
import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useStore} from '../services/store.service'

const CategoryPage = () => {
    const params = useParams()
    const {getCategoryById, category, clear} = useStore(state => state)

    useEffect(() => {
        clear('category')
        if (params?.id) {
            getCategoryById(params.id)
        }
    }, [])

    return (
        <SiteLayout>
            <CategoryForm category={params?.id ? category : null}/>
        </SiteLayout>
    )
}

export default React.memo(CategoryPage)
