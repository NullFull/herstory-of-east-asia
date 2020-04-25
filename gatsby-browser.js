import React from 'react'
import {LanguageProvider} from 'hooks/language'


export const wrapRootElement = ({element}) => <LanguageProvider>{element}</LanguageProvider>

export const shouldUpdateScroll = ({routerProps: {location, state}}) => {
    if (location.state.modal) {
        return false
    }
}
