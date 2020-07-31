import React from 'react';

LABEL = 'Country/Region';

const SelelctCountry = () => {
  return (
    <div>
      <select value={code} onChange={event => { setCode(event.target.value) }}>
        {LANGUAGES.map(language => (
          <option key={`lang-${LANGUAGE_CODES[language]}`} value={LANGUAGE_CODES[language]}>
            {language}
          </option>
        ))}
      </select>
    </div>
  )
}

export {
  SelelctCountry
}