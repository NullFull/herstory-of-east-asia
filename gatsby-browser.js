import React from 'react'
import {LanguageProvider} from 'hooks/language'
import {LocationProvider} from 'hooks/location'


export const wrapPageElement = ({ element, props }) => {
    return (
        <LanguageProvider tagDict={props.pageContext.tagDict}>
        <LocationProvider location={props.location}>
            {element}
        </LocationProvider>
        </LanguageProvider>
    )
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
    if (location.state && location.state.modal) {
        return false
    }
}
