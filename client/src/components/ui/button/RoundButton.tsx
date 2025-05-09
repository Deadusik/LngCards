import { FC } from 'react'
import styles from '../../../styles/components/ui/button/RoundButton.module.scss'
import { SPACE } from '../../../utils/constants'

interface Props {
    text: string
    isInverted?: boolean
    onClick: () => void
}

const RoundButton: FC<Props> = ({ text, isInverted = false, onClick }) => {
    const buttonStyle = isInverted ? [styles.mainBlock, styles.mainBlock_inverted].join(SPACE) : styles.mainBlock

    return (
        <button className={buttonStyle}
            onClick={onClick}>
            <p className={styles.mainBlock__text}>
                {text}
            </p>
        </button>
    )
}

export default RoundButton