import { useRef, useState } from 'react'
import styles from '../../../styles/components/ui/input/TextInput.module.scss'
import { SPACE } from '../../../utils/constants'

const TextInput = () => {
    const [isActive, setIsActive] = useState(false)
    const [text, setText] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const focusHandler = () => {
        setIsActive(true)
    }

    const blurHendler = () => {
        setIsActive(false)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value ?? '')
    }

    const onPlaceholderClick = () => {
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
                onChange={e => onChange(e)}
                onFocus={focusHandler}
                onBlur={blurHendler} />
            {/*placeholder*/}
            <p className={[
                styles.mainBlock__placeholder,
                isActive || text.length > 0 ? styles.mainBlock__placeholder_active : ''
            ].join(SPACE)}
                onClick={onPlaceholderClick}>
                Search
            </p>
        </div>
    )
}

export default TextInput