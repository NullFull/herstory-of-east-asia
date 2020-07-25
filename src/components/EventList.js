import React from 'react'
import {Link} from 'gatsby'
import {useLanguageContext, getI18n} from 'hooks/language'
import style from './EventList.module.styl'


const EventList = ({events}) => {
    const {code} = useLanguageContext()

    const [tag, setTag] = React.useState(null)
    const [country, setCountry] = React.useState(null)

    const countries = events.map(item => item['Country/Region']).filter((value, index, self) => self.indexOf(value) === index)


    const handleChange = event => {
        const targetValue = event.target.value;
        if(targetValue !== 'All Country') {
            setCountry(targetValue)
        } else {
            setCountry(null)
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.selector}>
                <select>
                    <option>All Tags</option>
                </select>
                <select onChange={handleChange}>
                    <option>All Country</option>
                    {countries.map(country => {
                        return <option key={country} value={country}>{country}</option>
                    })}
                </select>
            </div>
            <div className={style.events}>
                <ul>
                {events
                    .filter(event => tag ? event.tags.includes(tag) : true)
                    .filter(event => country ? event['Country/Region'] === country : true)
                    .map(event => (
                        <li key={`event-${event.id}`} className={style.event}>
                            <Link to={`/p/${event.id}`} state={{modal: true}}>
                                <h2>{getI18n(event, code, 'Title')}</h2>
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
