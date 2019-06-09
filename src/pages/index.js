import './index.styl'
import React from 'react'
import Papa from 'papaparse'
import ReactGlobe from 'react-globe'
import {Mesh, SphereGeometry, ShaderMaterial} from 'three'


class LanguageSelector extends React.Component {
    render() {
        return (
            <div className='language-select'>
                <select value={this.props.language} onChange={e => this.props.onChange(e.target.value)}>
                    {this.props.languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>
        )
    }
}


class EventList extends React.Component {
    LANGUAGES = [
        'English',
        'Taiwanese',
        'Japanese',
        'Korean',
    ]
    LANGUAGE_CODES = {
        'English': 'en_us',
        'Taiwanese': 'zh_tw',
        'Korean': 'ko_kr',
        'Japanese': 'ja_jp',
    }
    SOURCE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZO-2qE3ZYaJWf68HVCadcJT2hnyb2vdycYu2zYruYbStnPL1zNjvP8Zt7EjE8O2Fc5NXZ2oqjeeRK/pub?gid=1683764614&single=true&output=csv'
    FLAGS = {
        'Taiwan': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZjBhOTVmMS1kZDM2LTQ4NDEtYjI1NS0wMDNiOTMwYTcwYzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjA5NUZGQkY4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjA5NUZGQkU4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjAxNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNjNjOGViMy1lMzc3LTBmNDktODYwNy05M2EzNWE4MmI3ZjciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NThiM2FhZS05MjMyLTExZTctOWU1Ni1hMzU5NGQ1MjVlYjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6330mxAAACcElEQVR42uxXTWgTQRT+ZnayQUkbbGjUkkqhFDyI2KqgKN5UqoKQnoqgFCkYr72IgtCLPyiKCgriQT0K6cVC1UM8CJYKrYfSXiqIlBA0LZo2Wbv5m77JrlptxHazezIDszPM7M773pvv/SxDdFgCDOtunCNoZjHy6ho2mxkUoa37CBIshSWcVd/+uS6rvGN9x/D3E9bQGK++TL1IQst2L0rHEv5pyFVaK4GlMmLdEWwN6WjepOP8sQit2XsVa7jXxErhuo9D1xiyuSJ6D4YRDvpQIO1P7Anh/sskAhs0FEqAqR6uAyDF/JwhPrAD08kcTt2ewmx6qXIfT16ncPN0OzrbGhC9MQnTXG272gEwhsUvS3iUSCH1LY+sUcKD2HZoBOri0w+Ij81h/GMWmc8EKqi7zQEJH5Gs72Qr9nU04s34HK6cace57lb0H43gel8HRt/Po6stgP7oNuiKkFK6T0KfxiE0i+6c/aL9j7naU+94QEKGAin0cOgTeo60YP+uEC6R2QWZX13Bhccz2LuzCaMzC3g2krSugDO3SSgRaPYjdriFSGjgasrA2bvTla0tTX70HggTCQN4MTGPhe9eeAEpVJAMPbemsEhumBjsRGLyK7mdxPGuEA5dnkDDRoF8Ga4GJbEy/Cn/rrgYWSM+lsbQuzTFJAkjX0KZxky2aLOGeQHAPphbLnlveLYyqnbnOc0FdzsI2gA4r66REvhnLmK/Z8MS9VoxCZVSnabjRjOHWiGwt/7dkjkOIhLBvAHuMCipr4QqJpxTilEhUltgEqqS8SjVO6kH6gDqAOoA6gDqAP5DAEJ6Uues/fd8WYABAPWUy2l/sSqCAAAAAElFTkSuQmCC',
        'Japan': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMjgzZTNmYi1kMjM0LTZiNDAtYTBmNi0zNjdmODE2OWIwNGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDVCQTUzODQ4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDVCQTUzODM4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjAxNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkM2I3MDdiNS1mYmU2LWYwNGMtOGYzZC04ZGQ0ZjM0MTM4MDUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkMDcxYzhiYy05MjMyLTExZTctOWU1Ni1hMzU5NGQ1MjVlYjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz42hBGrAAACh0lEQVR42uxXTWsTURQ9bzLJZCZm2ojFf1FXpS4Ug+7bhdJNrRb9AYIQ6F9QKgjiSlxYRApFbJcuChUXCsWF/gsVkkzGTCYzyXve92bESiHzEXU2ueHBkLw399z77jn3hnW7XcEYQxEmyHTpvCgAZExDwTYDUDgAPT90Klwtxs85LfF/ADDToFM6hNsH73QjLPYZMFoYjSEG/j8CoJfAqgaC958weHWA4MNn8K9tIjMBON9A+eIFWOsrqFxeghgGQDgitCkCchxnshDJzBplimwId2sb/We7ENyjd1foh1K8iSJHQHpiwrq7BvtBC1rNjIBMeDfpUAoAFLkYhujcuAf/8C1VbX1C7XL6uKg2r6Hx+gldV5WuZTQRQCILZNrd1nbsfC6BOJra4x8donf/IRhlbioayoKTd95/vhtHnpbbNrwXewiOjqMs5NYBqvbBzgGlyssoGYxqwoe3s6+uMB8A4rno9VW1RwWXka50Jvz4BcJxf+tFNgAaeM8F/94+Ue1ZrERnO+DdvAAK7wUkr1LhtIWG4nl2G0M7Nw9trh5JdXYAQsmrVDgpMpmnHTpTXl4Em88LQBppu7WxohROikwW9wwGzFurlIhxfhrKxlK5sgRrc00pXFrj6MG6eR3G1WUIz59uHhD+EPajlpJXDichE0LtMS41YT/eggjCvzCQhGMwaixS22t3NiFYpPfyjgVG8Qroux/quXZ7A2ffPIVWrwEpACQ3o18dsawrbQ/eHcN7ua9Ehn9rR1EsyHa8CHN9FUaT0h6S4yC5Hafrhqf6QzXqkKRw3HHjgaQOpug2TrzzqQGcVMo/RzKenaoEIP9MmNPpbCyfATg188i/yEU5l75/CjAAG0sWOT/p+pUAAAAASUVORK5CYII=',
        'Korea': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMWI4MWUzNy01NDQ1LTI4NDUtYjExNy02YzQ4NmE0NWI5YzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDVCQTUzODg4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDVCQTUzODc4MjgxMTFFOThGMTREMUNBMTQ0QTgxRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjAxNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NGJhZThiYy1jMmFiLWI5NGMtYmE3Yi01MGI3YjNkNTE3ZTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5NmMyYTIxZS05MjMyLTExZTctOWU1Ni1hMzU5NGQ1MjVlYjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4/z5JXAAAEQ0lEQVR42uxXW0hjZxCenFzUqjFecDfJuqwUu7BPVaxadBUFi1ljo65o9c0HISKKfZHipaCCL4KgoBR90KrLSjHeKvsg+iL4oHhFcbX6ENEopcUkpnHVJGf6//92F6XmeJSw9qEDAycnc2a+f2bOfHMkSATuT5CD+xXJfQOA/zaAvr4+KCoqAo/Hc/viktYqKSmBnp6eGw2vlaGhIdqcmJmZiYuLi2i321GsOBwOXFpawqysLOZjY2PDqy0IBc/Pz8fp6WkMDAzEhoYG0QCampowICAAR0ZGcGxsDM/OznBzc1McgN7e3o/BZ2ZmUKlUYlJSEnNUVVUlmAl68urqahY4ISEB/f39cX19HaemppDjOOzu7hYGwPM8FhYWstTRk38IPjc3h9HR0ahSqdBsNnsFsL+/j6GhoajVanFnZwcTExMZCAooOzsbc3NzWQzBDFxcXODy8jJ78HLwyMjIf9eSOvN4rtxaWVnB1tZWdr27u8syIZfLcWFhAc/Pz8X1AE0lrTlN+3XBHb+8QUt+OZqf6Zhaco3oGJq84qOjowNjYmLY6evr672WDoSaqbKyEsPDwz8G5+0OPDQY8S1ocQse4TY8YUqv34IGLfoy5K0nzJa+BREREWg0GgUbViLEBU6nE46PjyEqKoq+r3BkqAD7ryaQQui19h6wgVL3LWgmfyIThoODgwMICQmB4OBg77NYLBk5TVNwUFBKJlewoJ0HHPDodQ8EfffCt6PY+fMIyACJ8oIqJzbUVqzIxM1VgN/Nf8A7RRhIQHGDqQKce3/CAw8PIOV8A4DWqCy5DH7T2ADkUmFjFw+fP1bCPCFazlcZkEgAwp48AOs+ISV/+T+QrrUkf7lARWw5zsd0XJqqJh1GAPBuorwXJf+53VD6XO0bOj49PYXDw0N2/TLpIbx4rgFwuLw/8JcLvknWQFHyewBHR0fsVb4zgNraWoiNjYXt7W3gSHZfVX8J2WlagoyAeOdm9WZ65mb3skjw19/Hst5bW1uDuLg4qKmpuT0Airq5uRnS0tKAzHFIT09nIFSfyWCyLh5e1cZDDjnl08dB8AVR/dcPYeCHeHjz41cQFvS+rWZnZ0GhUEBGRgbzRca7uIXE7XYzQpHJZIxIKDFpNBpUq9W4tbV1xdbl5pleFkq/7e3tzI/FYmE+pFIpW2pcLtfNdFxcXIx6vR5HR0fZYkFldXWVUSzlhb29Pa9znYxeNv8peZH6s3vk9Njf3485OTlYUFBwMx2THY4tJAaDgf1ua2vD1NRUxmrl5eVos9m8Ajg5OcGKigocHh7GlJQUbGlpYfcnJiaYz66uLnFsODAwwB6gC8T4+Dj6+flhXV2d6JWssbGR7QCDg4NoMpnYHkBLcys6/gBCp9Ph/Pw8Wq1W0QAo99MFhJbyTkvp5XLk5eWxhrqt0FrTmnd2dt59H/j/y+hTiEyA2j7J5/nfAgwAFTIjeG0k7ZgAAAAASUVORK5CYII=',
    }

    state = {
        language: this.LANGUAGES[0],
        events: [],
        selectedEvent: null,
        focus: undefined
    }

    fetchData = async () => {
        const response = await fetch(this.SOURCE_URL)
        const text = await response.text()
        const data = Papa.parse(text).data
        const header = data[0]
        let minYear
        const objs = data.slice(1).map(row => {
            let obj = {}
            header.forEach((key, i) => {
                obj[key] = row[i].trim()
                if (key === 'Start') {
                    minYear = minYear ? Math.min(minYear, obj[key]) : obj[key]
                }
                if (key === 'Location') {
                    obj[key] = obj[key].split(',')
                }
            })
            return obj
        })
        objs.sort((a, b) => a['Start'] - b['Start'])

        this.setState({
            events: objs
        })
    }

    getI18n(obj, key) {
        const code = this.LANGUAGE_CODES[this.state.language]

        if (obj[`${key}_${code}`]) {
            return obj[`${key}_${code}`]
        }

        for (let i = 0; i < this.LANGUAGES.length; i++) {
            const lang = this.LANGUAGES[i]
            const code = this.LANGUAGE_CODES[lang]
            if (obj[`${key}_${code}`]) {
                return obj[`${key}_${code}`]
            }
        }
    }

    componentDidMount() {
        // TODO : load saved language
        this.fetchData()
    }

    showDetail(obj) {
        this.setState({
            selectedEvent: obj,
            focus: obj['Location']
        })
    }

    close = () => {
        this.setState({
            selectedEvent: null
        })
    }

    changeLanguage = language => {
        this.setState({
            language: language
        })
    }

    render() {
        const selected = this.state.selectedEvent

        return (
            <div style={{position: 'relative'}}>
                <div className='header'>
                    <h1 className='title'>Herstory of East Asia</h1>
                    <LanguageSelector languages={this.LANGUAGES} onChange={lang => this.changeLanguage(lang)}/>
                </div>
                <div className='event-list'>
                {this.state.events.map((event, i) => (
                    <div key={`event-${i}`} className='event-list-item' onClick={() => this.showDetail(event)}>
                        <h4 className='year'>{event['Start']}</h4>
                        <img className='flag' src={this.FLAGS[event['Country']]}/>
                        <h3 className='title'>{this.getI18n(event, 'Title')}</h3>
                    </div>
                ))}
                </div>
                {selected &&
                    <div className='event-detail'>
                        <div className='wrapper'>
                            <div>
                                <a onClick={this.close}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAqklEQVRIx+2TOw6DMBQE9x5IOVIkpNQJ3/uXQGFPGkAQ8WzjhhRs+zQjW9qV7vxheORfJfFiojGvPRNl0M8E+GMFPR4YKUKKBn+smHHHO/aJRdFm4ZJE+6tY8U8CvlN0Wbgk0S2KFa9O4DtFHr55OjjqDHwj8Ha14rizepGK13a1UvBKCrUzCT+tOK5NssJuXZJinrMxmVkxhOdcMtqLo2HgGftEkX+9c1W+9ksaO/7cuy4AAAAASUVORK5CYII='/></a>
                            </div>
                            <div className='content'>
                                <h3 className='title'>{this.getI18n(selected, 'Title')}</h3>
                                <div className='desc' dangerouslySetInnerHTML={{
                                    __html: this.getI18n(selected, 'Description')
                                }}/>
                                <div className='country'>{selected['Country']}</div>
                            </div>
                        </div>
                    </div>
                }
                <div className='footer'>
                    <div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.e548197c0b50bd1460c99e0673a693e9.1560045730087.1560045730087.1560045730087.1&__hssc=57440181.4.1560045730087&__hsfp=2295064895" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                </div>
                <div className='globe'>
                    <ReactGlobe
                        focus={this.state.focus}
                        markers={this.state.focus ? [{
                            id: 20,
                            coordinates: this.state.focus,
                            value: 10
                        }] : []}
                        markerOptions={{
                            enableTooltip: false,
                            renderer: marker => {
                                const geometry = new SphereGeometry(5, 30, 30)
                                const material = new ShaderMaterial({
                                    fragmentShader: `
                                        uniform vec3 color;
                                        uniform sampler2D texture;
                                        varying vec3 vColor;

                                        void main() {
                                            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                                        }
                                    `
                                })
                                return new Mesh(geometry, material)
                            }
                        }}
                        globeOptions={{
                            texture: `https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg`,
                            cloudsSpeed: 0.02,
                            cloudsOpacity: 0.1
                        }}
                    />
                </div>
            </div>
        )
    }
}


class Index extends React.Component {
    render() {
        return (
            <div>
                <EventList />
            </div>
        )
    }
}


export default Index
