import { FC, useRef, useState } from 'react'
import styles from '../../../styles/components/ui/input/TextInput.module.scss'
import { SPACE } from '../../../utils/constants'

interface Props {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
}

const TextInput: FC<Props> = ({ text, setText, placeholder = 'Write text' }) => {
    const [isActive, setIsActive] = useState(false)
    //const [text, setText] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const FocusHandler = () => {
        setIsActive(true)
    }

    const BlurHandler = () => {
        setIsActive(false)
    }

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value ?? '')
    }

    const OnPlaceholderClick = () => {
        inputRef.current?.focus()
    }

    return (
        <div className={styles.mainBlock}>
            <input
                className={[
                    styles.mainBlock__textInput,
                    isActive ? styles.mainBlock__textInput_active : ''
                ].join(SPACE)}
                ref={inputRef}
                type='text'
                onChange={e => OnChange(e)}
                onFocus={FocusHandler}
                onBlur={BlurHandler} />
            {/*placeholder*/}
            <p className={[
                styles.mainBlock__placeholder,
                isActive || text.length > 0 ? styles.mainBlock__placeholder_active : ''
            ].join(SPACE)}
                onClick={OnPlaceholderClick}>
                {placeholder}
            </p>
        </div>
    )
}

export default TextInput