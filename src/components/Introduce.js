import React from 'react'
import { useLanguageContext } from 'hooks/language'
import style from './Introduce.module.styl'


export default ({introduce}) => {
    const { getI18n } = useLanguageContext()

    return (
        <div className={style.introduce} dangerouslySetInnerHTML={{__html: getI18n(introduce)}}/>
    )
}
