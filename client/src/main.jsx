import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import App from './App'
import './index.css'
import 'materialize-css/dist/js/materialize'
import './theme/styles.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App>
        <RouterProvider router={router}/>
    </App>,
)
