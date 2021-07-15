import React, { useEffect, useState } from 'react';

import axios from 'axios';

const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';

const Convert = ({ text, language }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setdebouncedText] = useState(text);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedText(text);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: API_KEY,
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [debouncedText, language]);

  return <h1 className='ui header'>{translated}</h1>;
};

export default Convert;
