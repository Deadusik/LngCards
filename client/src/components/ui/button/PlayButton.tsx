import styles from '../../../styles/components/ui/button/PlayButton.module.scss'
import playSvgSrc from '../../../assets/svgs/play.svg'
import { FC } from 'react'

interface Props {
    size?: string
    iconSrc?: string
    onClick: () => void
}

const PlayButton: FC<Props> = ({ size = '15px', iconSrc, onClick }) => {
    const onClickStopPropagationHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <div className={styles.mainBlock}
            onClick={onClickStopPropagationHandler}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
            style={{
                width: size
            }}>
            <img className={styles.mainBlock__img}
                src={iconSrc ? iconSrc : playSvgSrc}
                alt='play' />
        </div>
    )
}

export default PlayButton