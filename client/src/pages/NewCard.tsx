import { useState } from 'react'
// styles
import styles from '../styles/pages/NewCard.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
// components
import TextInput from '../components/ui/input/TextInput'
import RoundButton from '../components/ui/button/RoundButton'
// utils
import { SPACE } from '../utils/constants'

const NewCard = () => {
    const [foreignWord, setForeignWord] = useState('')

    const onSaveHandler = () => {
        console.log('on save card')
    }

    return (
        <div className={[styles.NewCard, wrapperStyles.contentVertical].join(SPACE)}>
            <div className={styles.NewCard__content}>
                <div className={styles.NewCard__imageBlock}>
                    <img src='' />
                </div>
                <TextInput
                    text={foreignWord}
                    placeholder='English'
                    setText={setForeignWord} />
                <TextInput
                    text={foreignWord}
                    placeholder='Ukranian'
                    setText={setForeignWord} />
                <TextInput
                    text={foreignWord}
                    placeholder='Example of usage (English)'
                    setText={setForeignWord} />
                <RoundButton
                    text='SAVE'
                    onClick={onSaveHandler} />
            </div>
        </div>
    )
}

export default NewCard