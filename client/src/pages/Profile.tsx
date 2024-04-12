import { FC } from 'react'
import styles from '../styles/pages/Profile.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
import { SPACE } from '../utils/constants'
import avatarImgSrc from '../assets/imgs/test/avatar.png'

const Profile: FC = () => {
    return (
        <div className={wrapperStyles.content}>
            <div className={styles.mainBlock}>
                <div className={styles.mainBlock}>
                    <div className={[
                        styles.mainBlock__userBlock,
                        styles.user
                    ].join(SPACE)}>
                        <img className={styles.user__avatar}
                            src={avatarImgSrc} />
                        <div className={styles.user__name}>Test Name</div>
                        <div className={styles.user__email}>testemail@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile