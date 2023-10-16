import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../routes'

const ErrroPage = () => {

    return (
        <h1> Страница не найдена

        Но вы можете перейти на <Link to='/login' >главную страницу </Link> </h1>
    )

}
export default ErrroPage