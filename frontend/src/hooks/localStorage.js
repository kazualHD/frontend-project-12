import {useState, useEffect} from 'react';

const getToken = (token, defaultValue ='') => {
    const value = localStorage.getItem(token);

    return JSON.parse(value) || defaultValue;
}

const useStorage = (token, defaultValue = '') => {
    const [key, setValue] = useState(() => 
      getToken(token, defaultValue)
    );
    useEffect(() => 
        localStorage.setItem(token, JSON.stringify(key)), [key, token]); 
    return [key, setValue];
}
export default useStorage;