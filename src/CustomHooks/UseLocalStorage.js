import { useEffect, useState } from "react";

const PREFIX = 'TRELLO-';


export function useLocalStorage(key, intialValue){
    /*
    useLocalStorage() checks if a key of 'CHROME-VOICE-<key>' exsits in local storage in the browser.
    If there is a matching key, the value  
    */
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(()=> {
        const storedItem = localStorage.getItem(prefixedKey);
        if (storedItem != null) {
            return JSON.parse(storedItem);
        }

        if (typeof intialValue === 'function'){
            return intialValue();
        } else {
            return intialValue;
        }
    })



    useEffect(() => {
        // Saves id into local storage whenever value changes
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]



}