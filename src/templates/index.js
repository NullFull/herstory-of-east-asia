import React from 'react'
import { navigate } from '@reach/router'
import Layout from './layout'
import { useLanguageContext } from 'hooks/language'
import EventList from 'components/EventList'
import style from './index.module.styl'


export default ({ pageContext }) => {
    const { getI18n, getI18nTag } = useLanguageContext()
    const { tags, countries, events, event } = pageContext

    const closeWindow = () => {
        navigate(-1)
    }

    return (
        <Layout pageContext={pageContext}>
            <div className={style.body}>
                <div className={style.list}>
                    <EventList
                        tags={tags}
                        countries={countries}
                        events={events}
                    />
                </div>
                <div className={style.detail}>
                    {event &&
                        <div className={style.dimmer}>
                            <div className={style.popup}>
                                <h4><strong>{getI18n(event, 'Title')}</strong></h4>
                                <p>{getI18n(event, 'Description')}</p>
                                <p className={style.dateinfo}>
                                    {event['Start'] && <div className={style.date}>{event['Start']}</div>}
                                    {(event['Start'] && event['Tags']) && <span className={style.division}>|</span>}
                                    {event['Place'] && <div className={style.region}>{event['Place']}</div>}
                                    {event['Tags']
                                        .filter(tag => tag)
                                        .map(tag => <span className={style.tag} key={tag}>{`#${getI18nTag(tag)}`}</span>)
                                    }
                                </p>

                                <button className={style.close} type="button" onClick={closeWindow}>X</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}
