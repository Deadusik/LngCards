import styles from '../../../styles/components/ui/button/PlayButton.module.scss'
import playSvgSrc from '../../../assets/svgs/play.svg'
import { FC } from 'react'

interface Props {
    size?: string
    onClick: () => void
}

const PlayButton: FC<Props> = ({ size = '15px', onClick }) => {
    return (
        <div className={styles.mainBlock}
            onClick={onClick}
            style={{
                width: size
            }}>
            <img className={styles.mainBlock__img}
                src={playSvgSrc}
                alt='play' />
        </div>
    )
}

export default PlayButton