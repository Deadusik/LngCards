import { useLocation } from 'react-router-dom'
import styles from '../styles/components/Topbar.module.scss'
import LanguageDropBox from './ui/dropbox/LanguageDropBox'
import { HOME, LEARNING, MATERIALS, PROFILE } from '../router/paths'
import IconButton from './ui/button/IconButton'
import { default as ArrowSvg } from '../assets/svgs/arrow_up.svg?react'

const Topbar = () => {
    const location = useLocation()

    const getNavbarContent = () => {
        switch (location.pathname) {
            case HOME: {
                return (
                    <h1>Topbar Home</h1>
                )
            }
            case LEARNING: {
                return (
                    <div className={styles.learningContent}>
                        <IconButton
                            onClick={() => console.log('Top bar back click')}
                            content={ArrowSvg}
                            transform='rotate(-90deg)'
                            triggerSize='40px' />
                        <LanguageDropBox foreignCountryCode='gb' nativeCountryCode='ua' />
                        <div>{/* space-between right item */}</div>
                    </div>
                )
            }
            case MATERIALS: {
                return (
                    <h1>Topbar Materials</h1>
                )
            }
            case PROFILE: {
                return (
                    <h1>Topbar Profile</h1>
                )
            }
        }
    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__content}>
                {getNavbarContent()}
            </div>
        </div>
    )
}

export default Topbar