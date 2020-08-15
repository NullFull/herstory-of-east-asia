import React from 'react'
import {LanguageProvider} from 'hooks/language'
import {LocationProvider} from 'hooks/location'


export const wrapRootElement = ({element}) => <LanguageProvider>{element}</LanguageProvider>

export const wrapPageElement = ({element, props}) => <LocationProvider location={props.location}>{element}</LocationProvider>

export const shouldUpdateScroll = ({routerProps: {location}}) => {
    if (location.state && location.state.modal) {
        return false
    }
}
