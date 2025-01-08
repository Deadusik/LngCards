import styles from '../../../styles/components/ui/button/SaveDataButton.module.scss'
import { default as SaveDataSvg } from '../../../assets/svgs/folder_save.svg?react'
import { FC } from 'react'

interface Props {
    onClick: () => void
}

const SaveDataButton: FC<Props> = ({ onClick }) => {
    return (
        <button
            className={styles.SaveDataButton}
            onClick={onClick}>
            <SaveDataSvg width={20} height={20} />
        </button>
    )
}

export default SaveDataButton