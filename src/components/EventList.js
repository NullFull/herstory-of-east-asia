import React from 'react'
import { Link } from 'gatsby'
import { useLanguageContext, getI18n } from 'hooks/language'
import kr from 'images/Flag_of_South_Korea.svg'
import jp from 'images/Flag_of_Japan.svg'
import tw from 'images/Flag_of_the_Republic_of_China.svg'
import hk from 'images/Flag_of_Hong_Kong.svg'
import style from './EventList.module.styl'

const FilterTags = list => {
    return list.map(item => item['Tags']).join().split(',').filter((value, index, self) => (self.indexOf(value) === index) && value.length > 0)
}

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

const EventList = ({ events }) => {
    const { code } = useLanguageContext()
    const [tag, setTag] = React.useState(null)
    const [country, setCountry] = React.useState(null)

    const countries = events.map(item => item['Country/Region']).filter((value, index, self) => self.indexOf(value) === index)
    const tags = FilterTags(events)

    const handleTag = event => {
        const targetValue = event.target.value
        if (targetValue !== 'All Tags') {
            setTag(targetValue)
        } else {
            setTag(null)
        }
    }

    const handleCountry = event => {
        const targetValue = event.target.value
        console.log(targetValue)
        if (!targetValue !== 'All Countries') {
            setCountry(targetValue)
        } else {
            setCountry(null)
        }
    }

    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>Timeline & Map</h2>
            <div className={style.selector}>
                <select onChange={handleTag}>
                    <option value={null}>All Tags</option>
                    {tags.map(tag => {
                        return <option key={tag} value={tag}>{tag}</option>
                    })}
                </select>
                <select onChange={handleCountry}>
                    <option value={null}>All Countries</option>
                    {countries.map(country => {
                        return <option key={country} value={country}>{country}</option>
                    })}
                </select>
            </div>
            <div className={style.events}>
                <ul>
                    {events
                        .filter(event => tag ? (event['Tags'] && event['Tags'].includes(tag)) : true)
                        .filter(event => country ? event['Country/Region'] === country : true)
                        .map((event, index) => (
                            <li key={`event-${index}`} className={style.event}>
                                <Link to={`/p/${event.id}`} state={{ modal: true }}>
                                    <h3>{getI18n(event, code, 'Title')}</h3>
                                </Link>
                                <p className={style.flag}>
                                    <FlagImage region={event['Country/Region']} />
                                </p>
                                <p className={style.tag}>
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}


export default EventList
