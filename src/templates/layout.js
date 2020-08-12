import React from 'react'
import {Link} from 'gatsby'
import {LanguageSelect} from 'hooks/language'
import Introduce from 'components/Introduce'
import logo from 'images/herstory-logo.svg'
import style from './layout.module.styl'


export default ({children, pageContext: {introduce}}) => {
    return (
        <>
            <div className={style.header}>
                <h1><Link to="/"><img src={logo}></img>Herstory of East Asia</Link></h1>
                <LanguageSelect />
                <Introduce introduce={introduce} />
            </div>
            <div className={style.body}>
                {children}
            </div>
        </>
    )
}
