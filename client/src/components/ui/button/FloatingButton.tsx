import styles from '../../../styles/components/ui/button/FloatingButton.module.scss'
import plusSvgSrc from '../../../assets/svgs/plus.svg'
import { FC } from 'react'

interface Props {
    onClick: () => void
}

const FloatingButton: FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.mainBlock}
            onClick={onClick}>
            <img
                className={styles.mainBlock__icon}
                src={plusSvgSrc}
                alt='plus' />
        </div>
    )
}

export default FloatingButton