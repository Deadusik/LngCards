import { FC } from 'react'
import styles from '../styles/pages/Profile.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Profile: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <h1>Profile page</h1>
            </div>
        </div>
    )
}

export default Profile