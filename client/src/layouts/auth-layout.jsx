import {Link, NavLink} from 'react-router-dom'

export const AuthLayout = ({children}) => {
    const activeClass = (isActive) => {
        return isActive ? 'grey darken-2' : ''
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper grey darken-1">
                    <Link to="/" className="brand-logo">Newborn</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/login" className={({isActive}) => activeClass(isActive)}>Вход</NavLink></li>
                        <li><NavLink to="/register" className={({isActive}) => activeClass(isActive)}>Регистрация</NavLink></li>
                    </ul>
                </div>
            </nav>

            <div className="auth-block">
                {children}
            </div>
        </>
    )
}
