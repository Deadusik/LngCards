import { FC } from 'react'
import styles from '../../../styles/components/ui/button/RoundButton.module.scss'

interface Props {
    text: string
    onClick: () => void
}

const RoundButton: FC<Props> = ({ text, onClick }) => {
    return (
        <button className={styles.mainBlock}
            onClick={onClick}>
            <p className={styles.mainBlock__text}>
                {text}
            </p>
        </button>
    )
}

export default RoundButton