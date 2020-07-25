import React from 'react'
import Layout from './layout'
import {getI18n, useLanguageContext} from 'hooks/language'
import EventList from 'components/EventList'
import style from './index.module.styl'


export default ({pageContext}) => {
    const {code} = useLanguageContext()
    const {events, event} = pageContext

    const closeWindow = () => {
        window.history.back();
    };

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
                                <strong>{getI18n(event, code, 'Title')}</strong>
                                <p>{getI18n(event, code, 'Description')}</p>
                                <button className={style.close} type="button" onClick={closeWindow}>X</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}
