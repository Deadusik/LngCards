import { FC } from 'react'
import styles from '../../styles/components/card/BackgroundCard.module.scss'
import { SPACE } from '../../utils/constants'

interface Props {
    angle?: number
    zIndex?: number
    hasShadow?: boolean
}

const BackgroundCard: FC<Props> = ({ angle = 0, zIndex = 0, hasShadow = false }) => {
    return (
        <div className={hasShadow ? [styles.BackgroundCard, styles.BackgroundCard_shadow].join(SPACE) : styles.BackgroundCard} style={{
            transform: `rotateZ(${angle}deg)`,
            zIndex: zIndex
        }}>
        </div >
    )
}

export default BackgroundCard