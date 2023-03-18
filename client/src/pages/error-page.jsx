import { useRouteError } from 'react-router-dom'
import React from 'react'

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div id="error-page" className="center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default React.memo(ErrorPage)
