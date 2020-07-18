import React from 'react'
import {LanguageProvider} from 'hooks/language'


export const wrapRootElement = ({element}) => <LanguageProvider>{element}</LanguageProvider>

export const shouldUpdateScroll = ({routerProps: {location}}) => {
    if (location.state && location.state.modal) {
        return false
    }
}
