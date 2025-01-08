import { FC } from 'react'
// styles
import styles from '../styles/pages/Profile.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
// utils
import { SPACE } from '../utils/constants'
// assets
import avatarImgSrc from '../assets/test/imgs/avatar.png'
import { default as LockSvg } from '../assets/svgs/lock.svg?react'
import { default as ExitSvg } from '../assets/svgs/exit.svg?react'
import { default as DeleteSvg } from '../assets/svgs/trash_delete.svg?react'
import { default as SaveDataSvg } from '../assets/svgs/save.svg?react'
import { default as InstagramSvg } from '../assets/svgs/social/instagram.svg?react'
import { default as FacebookSvg } from '../assets/svgs/social/facebook.svg?react'
import { default as TwitterSvg } from '../assets/svgs/social/twitter.svg?react'
import { default as BrowserSvg } from '../assets/svgs/social/browser.svg?react'

const Profile: FC = () => {
    return (
        <div className={styles.Profile}>
            <div className={wrapperStyles.content}>
                <div className={styles.Profile__content}>
                    {/* user section */}
                    <div className={[
                        styles.Profile__userBlock,
                        styles.User
                    ].join(SPACE)}>
                        <img className={styles.User__avatar}
                            src={avatarImgSrc} />
                        <div className={styles.User__name}>Deadusik Deadusik</div>
                        <div className={styles.User__email}>deadusik@gmail.com</div>
                    </div>
                    {/* menu section */}
                    <div className={styles.Menu}>
                        <button className={styles.MenuButton}>
                            <div className={styles.MenuButton__svg}
                                style={{
                                    left: '15px'
                                }}>
                                <LockSvg width={35} height={35} />
                            </div>
                            <p>Login Options</p>
                        </button>
                        <button className={styles.MenuButton}>
                            <div className={styles.MenuButton__svg}>
                                <ExitSvg width={30} height={30} />
                            </div>
                            <p>Logout</p>
                        </button>
                        <button className={styles.MenuButton}>
                            <div className={styles.MenuButton__svg}>
                                <SaveDataSvg width={25} height={25} />
                            </div>
                            <p>Save Set of Cards</p>
                        </button>
                        {/* social */}
                        <div className={styles.Social}>
                            <div className={styles.Social__link}>
                                <button>
                                    <FacebookSvg width={25} height={25} />
                                </button>
                            </div>
                            <div className={styles.Social__link}>
                                <button>
                                    <InstagramSvg width={30} height={30} />
                                </button>
                            </div>
                            <div className={styles.Social__link}>
                                <button>
                                    <TwitterSvg width={25} height={25} />
                                </button>
                            </div>
                            <div className={styles.Social__link}>
                                <button>
                                    <BrowserSvg width={30} height={30} />
                                </button>
                            </div>
                        </div>
                        {/* delete account button */}
                        <button className={styles.MenuButton}>
                            <div className={styles.MenuButton__svg}>
                                <DeleteSvg width={25} height={25} />
                            </div>
                            <p>Delete Account</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile