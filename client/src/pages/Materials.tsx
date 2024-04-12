import { FC } from 'react'
import styles from '../styles/pages/Materials.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Materials: FC = () => {
    return (
        <div className={wrapperStyles.content}>
            <div className={styles.mainBlock}>
                <h1>Materials</h1>
            </div>
        </div >
    )
}

export default Materials