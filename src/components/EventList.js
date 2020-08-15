import React from 'react'
import {Link} from 'gatsby'
import {useLanguageContext, getI18n} from 'hooks/language'
import kor from 'images/Flag_of_South_Korea.svg'
import style from './EventList.module.styl'

const FilterTags = list => {
    return list.map(item => item['Tags']).join().split(',').filter((value, index, self) => (self.indexOf(value) === index) && value.length > 0)
}

const EventList = ({events}) => {
    const {code} = useLanguageContext()

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
                    .filter(event => tag ? event.tags.includes(tag) : true)
                    .filter(event => country ? event['Country/Region'] === country : true)
                    .map(event => (
                        <li key={`event-${event.id}`} className={style.event}>
                            <Link to={`/p/${event.id}`} state={{modal: true}}>
                                <h3>{getI18n(event, code, 'Title')}</h3>
                            </Link>
                                <p className={style.flag}><img src={kor}></img>한국</p>
                                <p className={style.tag}><span>#tag</span><span>#tag</span><span>#tag</span></p>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}


export default EventList
