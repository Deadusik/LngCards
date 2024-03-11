import { FC, useState } from 'react'
import styles from '../../../styles/components/ui/button/CardMenuButton.module.scss'
import CardMenuDialog from '../../dialog/CardMenuDialog'

interface Props {
    size?: string
    onClick: () => void
}

const CardMenuButton: FC<Props> = ({ size = '50px', onClick }) => {
    const [isActive, setIsActive] = useState(true)

    const blurHandler = () => {
        setIsActive(false)
    }

    return (
        <div className={styles.mainBlock}
            onClick={onClick}
            onBlur={blurHandler}
            style={{
                width: size,
                height: size
            }}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
            </div>
            {
                isActive &&
                <div className={styles.mainBlock__cardMenu}>
                    <CardMenuDialog />
                </div>
            }
        </div>
    )
}

export default CardMenuButton 