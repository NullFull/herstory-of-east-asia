import React from 'react'
import Layout from './layout'
import {getI18n, useLanguageContext} from 'hooks/language'
import EventList from 'components/EventList'
import style from './index.module.styl'


export default ({pageContext}) => {
    const {code} = useLanguageContext()
    const {events, event} = pageContext

    return (
        <Layout pageContext={pageContext}>
            <div className={style.body}>
                <div className={style.list}>
                    <EventList events={events} />
                </div>
                <div className={style.detail}>
                    {event &&
                        <div className={style.dimmer}>
                            <div className={style.popup}>
                                <h3>{getI18n(event, code, 'Title')}</h3>
                                <p>
                                    {getI18n(event, code, 'Description')}
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}
