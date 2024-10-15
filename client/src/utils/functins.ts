export const pronounceText = (text: string) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
}