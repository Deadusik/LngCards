import { FC } from 'react'
import styles from '../styles/pages/Learning.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Learning: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <h1>Learning page</h1>
            </div>
        </div>
    )
}

export default Learning