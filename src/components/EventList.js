import React from 'react'
import {Link} from 'gatsby'
import {useLanguageContext, getI18n} from 'hooks/language'
import style from './EventList.module.styl'


const EventList = ({events}) => {
    const {code} = useLanguageContext()

    const {tag, setTag} = React.useState(null)
    const {country, setCountry} = React.useState(null)

    return (
        <div className={style.wrapper}>
            <div>
                <select>
                    <option>All Tags</option>
                </select>
                <select>
                    <option>All Country</option>
                </select>
            </div>
            <div>
                <ul>
                {events
                    .filter(event => tag ? event.tags.includes(tag) : true)
                    .filter(event => country ? event.country === country : true)
                    .map(event => (
                        <li key={`event-${event.id}`} className={style.event}>
                            <Link to={`/a/${event.id}`} state={{modal: true}}>
                                <h3>{getI18n(event, code, 'Title')}</h3>
                            </Link>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}


export default EventList
