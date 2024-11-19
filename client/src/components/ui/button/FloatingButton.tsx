import styles from '../../../styles/components/ui/button/FloatingButton.module.scss'
import { FC } from 'react'
import { default as PlusSvg } from '../../../assets/svgs/plus.svg?react'

interface Props {
    onClick: () => void
}

const FloatingButton: FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.mainBlock}
            onClick={onClick}>
            <PlusSvg width={30} height={30} stroke='white' />
        </div>
    )
}

export default FloatingButton