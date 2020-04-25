import React from 'react'
import {useLanguageContext, getI18n} from 'hooks/language'


export default ({introduce}) => {
    const {code} = useLanguageContext()

    return (
        <div dangerouslySetInnerHTML={{__html: getI18n(introduce, code)}}/>
    )
}
