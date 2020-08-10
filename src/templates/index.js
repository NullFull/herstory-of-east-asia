import React from 'react'
import { navigate } from '@reach/router'
import Layout from './layout'
import {getI18n, useLanguageContext} from 'hooks/language'
import EventList from 'components/EventList'
import style from './index.module.styl'


export default ({pageContext}) => {
    const {code} = useLanguageContext()
    const {events, event} = pageContext

    const closeWindow = () => {
        navigate(-1)
    }

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
                                <h4><strong>{getI18n(event, code, 'Title')}</strong></h4>
                                <p>{getI18n(event, code, 'Description')}</p>
                                <p className={style.dateinfo}>
                                    <span className={style.date}>1997</span>|
                                    <span className={style.region}>seoul, Korea</span>
                                    <span className={style.tag}>#tag</span>
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
