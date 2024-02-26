import { FC } from 'react'
import styles from '../styles/pages/Error.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Error: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <h1>Error page</h1>
            </div>
        </div>
    )
}

export default Error