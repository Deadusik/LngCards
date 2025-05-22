import { COUNTRY_CODES } from "./constants";

export const pronounceText = (text: string) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
}

export const getCountryName = (code: string) => {
    return COUNTRY_CODES[code.toUpperCase()] || 'Unknown country';
}