import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from 'axios'
import {clearToken, getToken, setToken} from './localStorage.service.js'
import {orderLimit} from '../config.js'

export const useStore = create(devtools((setState, getState) => ({
    isAuth: false,
    isLoading: false,
    token: null,
    message: null,
    error: null,
    categories: [],
    category: null,
    positions: [],
    order: [],
    orders: [],
    modalInstance: null,
    orderOffset: 0,
    noMoreOrders: false,
    overviewGain: null,
    overviewOrders: null,
    analytics: null,
    init: () => {
        const token = getToken()
        if (token) {
            setState({
                token,
                isAuth: true
            })
        }
    },
    clear: (key) => {
        setState({
            [key]: null
        })
    },
    login: async (payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const {data} = await axios.post('/api/auth/login', payload)

            if (data.token) {
                setState({
                    token: data.token,
                    isAuth: true,
                    message: 'Вы успешно вошли в систему.',
                    isLoading: false
                })

                setToken(data.token)
            }

        } catch (e) {
            setState({
                error: e.response.data.message,
                isLoading: false
            })
        }
    },
    register: async (payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.post('/api/auth/register', payload)

            if (response.status === 201) {
                setState({
                    message: 'Вы успешно зарегистрированы. Войдите в систему, используя свой логин и пароль',
                    isLoading: false
                })
            }

        } catch (e) {
            setState({
                error: e.response.data.email,
                isLoading: false
            })
        }
    },
    logout: () => {
        clearToken()
        setState({
            isAuth: false,
            token: null
        })
    },
    setModalInstance: (instance) => {
        setState({
            modalInstance: instance
        })
    },
    getAllCategories: async () => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.get('/api/category', {
                headers: {
                    Authorization: getState().token
                }
            })
            if (response.status === 200) {
                setState({
                    categories: response.data,
                    isLoading: false,
                    message: 'Категории загружены'
                })
            }
        } catch (error) {
            if (error.response.status === 401) {
                clearToken()
                setState({
                    isAuth: false,
                    token: null,
                    error: 'Сессия закончилась. Пожалуйста войдите в систему',
                    isLoading: false
                })
            }
        }
    },
    getCategoryById: async (id) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.get(`/api/category/${id}`, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    category: response.data,
                    isLoading: false
                })
            }
        } catch (error) {
            if (error.response.status === 500) {
                setState({
                    isLoading: false,
                    error: 'Категория не найдена'
                })
            }
        }
    },
    createCategory: async (payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        const formData = new FormData()

        if (payload.image) {
            formData.append('image', payload.image, payload.image.name)
        }

        formData.append('name', payload.name)

        try {
            const response = await axios.post('/api/category', formData, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 201) {
                setState({
                    isLoading: false,
                    message: 'Категория успешно создана',
                    categories: [
                        response.data,
                        ...getState().categories
                    ]
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Категория не создана'
            })
        }
    },
    updateCategory: async (id, payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        const formData = new FormData()

        if (payload.image) {
            formData.append('image', payload.image, payload.image.name)
        }

        formData.append('name', payload.name)

        try {
            const response = await axios.patch(`/api/category/${id}`, formData, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                const categories = getState().categories.filter(el => el._id !== id)
                setState({
                    isLoading: false,
                    message: 'Категория успешно обновлена',
                    categories: [
                        response.data,
                        ...categories
                    ]
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Категория не обновлена'
            })
        }
    },
    removeCategory: async (id) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.delete(`/api/category/${id}`, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    categories: getState().categories.filter(el => el._id !== id),
                    message: response.data.message
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Категория не удалена'
            })
        }

        const positions = getState().positions
        positions.forEach(p => {
            axios.delete(`/api/position/${p._id}`, {
                headers: {
                    Authorization: getState().token
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setState({
                            isLoading: false,
                            message: res.data.message,
                            positions: []
                        })
                    }
                })
                .catch((_) => {
                    setState({
                        isLoading: false,
                        error: 'Ошибка! Позиция не удалена'
                    })
                })
        })
    },
    getPositions: async (categoryId) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.get(`/api/position/${categoryId}`, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    positions: response.data,
                    isLoading: false
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка!'
            })
        }
    },
    createPosition: async (payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.post(`/api/position`, payload, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 201) {
                setState({
                    isLoading: false,
                    message: 'Позиция успешно создана',
                    positions: [
                        response.data,
                        ...getState().positions
                    ]
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Позиция не создана'
            })
        }
    },
    removePosition: async (id) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.delete(`/api/position/${id}`, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    message: response.data.message,
                    positions: getState().positions.filter(el => el._id !== id)
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Позиция не удалена'
            })
        }
    },
    updatePosition: async (id, payload) => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.patch(`/api/position/${id}`, payload, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                const positions = getState().positions.filter(el => el._id !== id)
                setState({
                    isLoading: false,
                    message: 'Позиция успешно обновлена',
                    positions: [
                        response.data,
                        ...positions
                    ]
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Позиция не обновлена'
            })
        }
    },
    setOrder: (position) => {
        let order = getState().order

        if (order.length === 0) {
            setState({
                order: [position],
                message: 'Позиция добавлена'
            })
        } else {
            order = order.map(item => {

                if (item.name === position.name) {
                    let prevQuantity = Number(item.quantity)
                    let posQuantity = Number(position.quantity)
                    let resultQuantity = prevQuantity + posQuantity

                    return {
                        ...item,
                        quantity: resultQuantity
                    }
                } else {
                    return item
                }
            })

            const findElement = order.find(el => el.name === position.name)

            if (!findElement) {
                order = [...order, position]
            }

            setState({
                order,
                message: 'Позиция добавлена'
            })
        }
    },
    deleteOrderItem: (name) => {
        setState({
            order: getState().order.filter(el => el.name !== name),
            message: 'Позиция удалена'
        })
    },
    createOrder: async () => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        const order = getState().order

        const payload = {
            list: order
        }

        try {
            const response = await axios.post('/api/order', payload, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 201) {
                setState({
                    isLoading: false,
                    order: [],
                    orders: [
                        response.data,
                        ...getState().orders
                    ],
                    message: 'Заказ успешно создан'
                })
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Заказ не создан'
            })
        }
    },
    getAllOrders: async () => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        const orderOffset = getState().orderOffset

        try {
            const response = await axios.get('/api/order', {
                headers: {
                    Authorization: getState().token
                },
                params: {
                    offset: orderOffset,
                    limit: orderLimit
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    orders: [
                        ...getState().orders,
                        ...response.data
                    ],
                    message: 'Заказы загружены',
                    orderOffset: orderOffset + orderLimit
                })
            }

            if (response.data.length < orderLimit) {
                setState({
                    noMoreOrders: true
                })
            }
        } catch (error) {
            if (error.response.status === 401) {
                setState({
                    isLoading: false
                })
            } else {
                setState({
                    isLoading: false,
                    error: 'Ошибка! Заказы не загружены'
                })
            }
        }
    },
    getFilteredOrders: async (params) => {
        setState({
            message: null,
            error: null,
            isLoading: true,
            orders: [],
            orderOffset: 0
        })

        const orderOffset = getState().orderOffset
        const resultParams = {
            offset: orderOffset,
            limit: orderLimit,
            ...params,
        }

        try {
            const response = await axios.get('/api/order', {
                headers: {
                    Authorization: getState().token
                },
                params: resultParams
            })
            if (response.status === 200) {
                setState({
                    isLoading: false
                })

                if (response.data.length) {
                    setState({
                        message: 'Заказы найдены',
                        orders: response.data
                    })
                } else {
                    setState({
                        message: 'Заказы не найдены. Уточните параметры поиска'
                    })
                }
            }
        } catch (e) {
            setState({
                isLoading: false,
                error: 'Ошибка! Заказы не загружены'
            })
        }
    },
    getOverview: async () => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.get('/api/analytics/overview', {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    message: 'Аналитика загружена',
                    overviewGain: response.data.gain,
                    overviewOrders: response.data.orders
                })
            }
        } catch (error) {
            if (error.response.status === 401) {
                setState({
                    isLoading: false
                })
            } else {
                setState({
                    isLoading: false,
                    error: 'Ошибка! Аналитика не загружена'
                })
            }
        }
    },
    getAnalytics: async () => {
        setState({
            message: null,
            error: null,
            isLoading: true
        })

        try {
            const response = await axios.get('/api/analytics/analytics', {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    analytics: response.data

                })
            }
        } catch (error) {
            setState({
                isLoading: false
            })
        }
    }
})))
