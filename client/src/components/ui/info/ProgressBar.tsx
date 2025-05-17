import { FC } from 'react'
import styles from '../../../styles/components/ui/info/ProgressBar.module.scss'

interface Props {
    progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {
    return (
        <div className={styles.ProgressBar}>
            <div className={styles.ProgressBar__progress}
                style={{
                    width: `${progress}%`
                }}></div>
        </div>
    )
}

export default ProgressBar