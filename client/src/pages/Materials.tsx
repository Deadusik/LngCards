import { FC } from 'react'
import styles from '../styles/pages/Materials.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Materials: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <h1>Material page</h1>
            </div>
        </div>
    )
}

export default Materials