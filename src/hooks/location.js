import React from 'react'


const LocationContext = React.createContext({})

const LocationProvider = ({location, children}) => (
    <LocationContext.Provider value={location}>
        {children}
    </LocationContext.Provider>
)

const useLocation = () => React.useContext(LocationContext)

export {
    LocationProvider,
    useLocation
}
