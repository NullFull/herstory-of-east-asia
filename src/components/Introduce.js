import React from 'react'
import {useLanguageContext, getI18n} from 'hooks/language'
import style from './Introduce.module.styl'


export default ({introduce}) => {
    const {code} = useLanguageContext()

    return (
        <div className={style.introduce} dangerouslySetInnerHTML={{__html: getI18n(introduce, code)}}/>
    )
}
