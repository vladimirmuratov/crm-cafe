import {Link, useLocation} from 'react-router-dom'
import {useStore} from '../services/store.service'
import {useEffect} from 'react'

export const SiteLayout = ({children}) => {
    const {pathname} = useLocation()
    const {logout} = useStore(state => state)

    const activeClass = (url) => url === pathname ? 'active' : ''

    const links = [
        {id: 1, url: '/overview', name: 'Обзор'},
        {id: 2, url: '/analytics', name: 'Аналитика'},
        {id: 3, url: '/history', name: 'История'},
        {id: 4, url: '/order', name: 'Добавить заказ'},
        {id: 5, url: '/categories', name: 'Ассортимент'},
    ]

    useEffect(() => {
        document.addEventListener('mouseenter', function () {
            const elems = document.querySelectorAll('.fixed-action-btn')
            M.FloatingActionButton.init(elems)
        })
    }, [])

    return (
        <div>
            <ul className="sidenav sidenav-fixed a-sidenav">
                <h4>Newborn</h4>
                {links.map(({id, url, name}) => (
                    <li key={id} className={activeClass(url)}>
                        <Link to={url} className="waves-effect waves-orange">{name}</Link>
                    </li>
                ))}
                <li className="bold last">
                    <Link
                        to="/login"
                        className="waves-effect waves-orange"
                        onClick={logout}
                    >
                        Выйти
                    </Link>
                </li>
            </ul>
            <main className="content">
                {children}
            </main>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </a>
                <ul>
                    <li><Link to="/order" className="btn-floating green"><i
                        className="material-icons">assignment</i></Link></li>
                    <li><Link to="/categories/new" className="btn-floating blue"><i
                        className="material-icons">list</i></Link></li>
                </ul>
            </div>
        </div>
    )
}
