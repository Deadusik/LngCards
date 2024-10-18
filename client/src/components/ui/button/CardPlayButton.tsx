import { FC } from 'react'
import styles from '../../../styles/components/ui/button/CardPlayButton.module.scss'
import { default as SoundSvg } from '../../../assets/svgs/sound.svg?react'

interface Props {
    onClick: () => void
    isFrontSide: boolean
}

const CardPlayButton: FC<Props> = ({ isFrontSide, onClick }) => {
    const onClickStopPropagationHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <button className={styles.CardPlayButton}
            onClick={onClickStopPropagationHandler}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
            onMouseUp={e => {
                if (isFrontSide)
                    e.stopPropagation()
            }}>
            <SoundSvg width={20} height={20} />
        </button>
    )
}

export default CardPlayButton