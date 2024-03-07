import { useRef, useState } from 'react'
import styles from '../../../styles/components/ui/input/DropBox.module.scss'
import { SPACE } from '../../../utils/constants'

export enum CardState {
    none = '',
    toLearn = 'To learn',
    known = 'Known',
    learned = 'Learned'
}

const DropBox = () => {
    const [isActive, setIsActive] = useState(false)
    const [cardState, setCardState] = useState<CardState>(CardState.none)
    const selectRef = useRef<HTMLDivElement>(null)

    const focusHandler = () => {
        setIsActive(true)
    }

    const blurHendler = () => {
        setIsActive(false)
        selectRef.current?.blur()
    }

    const onClickHendler = () => {
        if (!isActive)
            selectRef.current?.focus()
    }

    const onClickOptionHendler = (state: CardState) => {
        setCardState(state)
    }

    return (
        <div className={styles.mainBlock}
            onClick={onClickHendler}>
            <div className={[
                styles.mainBlock__select,
                isActive ? styles.mainBlock__select_active : ''
            ].join(SPACE)}
                ref={selectRef}
                tabIndex={0}
                onFocus={focusHandler}
                onBlur={blurHendler}>
                {/*selected option*/}
                <p className={styles.mainBlock__selectedOption}>
                    {
                        cardState !== CardState.none &&
                        cardState
                    }
                </p>
                {/*options*/}
                {isActive &&
                    <div className={styles.mainBlock__optionsBlock}
                        onClick={blurHendler}>
                        <div className={styles.mainBlock__option}
                            onClick={() => onClickOptionHendler(CardState.none)}>
                            All
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => onClickOptionHendler(CardState.toLearn)}>
                            To learn
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => onClickOptionHendler(CardState.known)}>
                            Known
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => onClickOptionHendler(CardState.learned)}>
                            Learned
                        </div>
                    </div>
                }
            </div>
            {/*placeholder*/}
            {
                <p className={[
                    styles.mainBlock__placeholder,
                    isActive || cardState !== CardState.none ?
                        styles.mainBlock__placeholder_active : ''
                ].join(SPACE)}>
                    Card state
                </p>
            }
            {/*arrow*/}
            <div className={[
                styles.mainBlock__arrow,
                isActive ? styles.mainBlock__arrow_active : ''
            ].join(SPACE)}>
            </div>
        </div>
    )
}

export default DropBox