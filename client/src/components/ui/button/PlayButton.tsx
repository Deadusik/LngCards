import styles from '../../../styles/components/ui/button/PlayButton.module.scss'
import { FC } from 'react'
import { default as SoundSvg } from '../../../assets/svgs/sound.svg?react'

interface Props {
    onClick: () => void
}

const PlayButton: FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.mainBlock}
            onClick={onClick}>
            <SoundSvg width={20} height={20} />
        </div>
    )
}

export default PlayButton