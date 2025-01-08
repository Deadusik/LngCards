import { useLocation, useNavigate } from 'react-router-dom'
// styles
import styles from '../styles/components/Topbar.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
// components
import LanguageDropBox from './ui/dropbox/LanguageDropBox'
import IconButton from './ui/button/IconButton'
// utils
import { SPACE } from '../utils/constants'
import { HOME, LEARNING, MATERIALS, PROFILE } from '../router/paths'
//assets
import { default as ArrowSvg } from '../assets/svgs/arrow_up.svg?react'

const Topbar = () => {
    const location = useLocation()
    const navigate = useNavigate()

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
                            onClick={() => navigate(HOME)}
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
            default: {
                return <h1>Topbar</h1>
            }
        }
    }

    return (
        <div className={styles.mainBlock}>
            <div className={[
                styles.mainBlock__content,
                wrapperStyles.contentNavbar
            ].join(SPACE)}>
                {getNavbarContent()}
            </div>
        </div>
    )
}

export default Topbar