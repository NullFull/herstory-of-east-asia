import React from 'react'
import {LanguageProvider} from 'hooks/language'


export const wrapRootElement = ({element}) => <LanguageProvider>{element}</LanguageProvider>
