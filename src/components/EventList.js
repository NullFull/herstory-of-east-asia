import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from 'hooks/location'
import { useLanguageContext } from 'hooks/language'
import kr from 'images/Flag_of_South_Korea.svg'
import jp from 'images/Flag_of_Japan.svg'
import tw from 'images/Flag_of_the_Republic_of_China.svg'
import hk from 'images/Flag_of_Hong_Kong.svg'
import style from './EventList.module.styl'


const FlagImage = ({ region }) => {
    switch (region) {
        case 'Korea':
            return <img src={kr} alt="Flag of South Korea" />
        case 'Japan':
            return <img src={jp} alt="Flag of Japan" />
        case 'Taiwan':
            return <img src={tw} alt="Flag of Taiwan" />
        case 'Hong Kong':
            return <img src={hk} alt="Flag of Hong Kong" />
        default:
            return
    }
}

const EventList = ({ tags, countries, events }) => {
    const { getI18n, getI18nTag } = useLanguageContext()
    const { state: prevState } = useLocation()

    const [tag, setTag] = React.useState(prevState?.tag || '')
    const [country, setCountry] = React.useState(prevState?.country || '')

    const handleTag = event => setTag(event.target.value)
    const handleCountry = event => setCountry(event.target.value)

    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>Timeline & Map</h2>
            <div className={style.selector}>
                <select onChange={handleTag}>
                    <option value={''}>All Tags</option>
                    {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
                <select onChange={handleCountry}>
                    <option value={''}>All Countries</option>
                    {countries.map(country => (
                         <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div className={style.events}>
                <ul>
                    {events
                        .filter(event => tag ? (event['Tags'] && event['Tags'].includes(tag)) : true)
                        .filter(event => country ? event['Country/Region'] === country : true)
                        .map((event, index) => {
                            return (
                                <li key={`event-${index}`} className={style.event}>
                                    <Link to={`/p/${event.id}`} state={{ modal: true, tag, country }}>
                                        <h3>{getI18n(event, 'Title')}</h3>
                                    </Link>
                                    <p className={style.flag}>
                                        <FlagImage region={event['Country/Region']} />
                                    </p>
                                    <p className={style.tag}>
                                        {event['Tags']
                                            .filter(tag => tag)
                                            .map(tag => <span key={tag}>{`#${getI18nTag(tag)}`}</span>)
                                        }
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}


export default EventList
