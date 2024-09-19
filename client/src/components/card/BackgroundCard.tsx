import { FC } from 'react'
import styles from '../../styles/components/card/BackgroundCard.module.scss'

interface Props {
    angle?: number
    zIndex?: number
}

const BackgroundCard: FC<Props> = ({ angle = 0, zIndex = 0 }) => {
    return (
        <div className={styles.BackgroundCard} style={{
            transform: `rotateZ(${angle}deg)`,
            zIndex: zIndex
        }}>
        </div >
    )
}

export default BackgroundCard