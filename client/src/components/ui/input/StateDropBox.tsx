import { FC, useRef, useState } from 'react'
import styles from '../../../styles/components/ui/input/StateDropBox.module.scss'
import { SPACE } from '../../../utils/constants'
import { CardState } from '../../../utils/enum'

export enum OptionsPlacement {
    default,
    top
}

interface Props {
    cardState: CardState
    setCardState: React.Dispatch<React.SetStateAction<CardState>>
    optionPlacement?: OptionsPlacement
}

const StateDropBox: FC<Props> = ({ cardState, setCardState, optionPlacement = OptionsPlacement.default }) => {
    const [isActive, setIsActive] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const FocusHandler = () => {
        setIsActive(true)
    }

    const BlurHandler = () => {
        setIsActive(false)
        selectRef.current?.blur()
    }

    const OnClickHandler = () => {
        if (!isActive)
            selectRef.current?.focus()
    }

    const OnClickOptionHandler = (state: CardState) => {
        setCardState(state)
    }

    return (
        <div className={styles.mainBlock}
            onClick={OnClickHandler}>
            <div className={[
                styles.mainBlock__select,
                isActive ? styles.mainBlock__select_active : ''
            ].join(SPACE)}
                ref={selectRef}
                tabIndex={0}
                onFocus={FocusHandler}
                onBlur={BlurHandler}>
                {/*selected option*/}
                <p className={styles.mainBlock__selectedOption}>
                    {
                        cardState !== CardState.none &&
                        cardState
                    }
                </p>
                {/*options*/}
                {isActive &&
                    <div className={[
                        styles.mainBlock__optionsBlock,
                        optionPlacement === OptionsPlacement.top ?
                            styles.mainBlock__optionsBlock_top : ''
                    ].join(SPACE)}
                        onClick={BlurHandler}>
                        <div className={styles.mainBlock__option}
                            onClick={() => OnClickOptionHandler(CardState.none)}>
                            All
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => OnClickOptionHandler(CardState.toLearn)}>
                            To learn
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => OnClickOptionHandler(CardState.known)}>
                            Known
                        </div>
                        <div className={styles.mainBlock__option}
                            onClick={() => OnClickOptionHandler(CardState.learned)}>
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

export default StateDropBox