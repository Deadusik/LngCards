import { useState } from 'react'
import RelatedToggleIcon from './ui/button/RelatedToggleIcon'
import styles from '../styles/components/Navbar.module.scss'

// svg src
import cardsSvgSrs from '../assets/svgs/cards.svg'
import bookSvgSrc from '../assets/svgs/book.svg'
import personSvgSrc from '../assets/svgs/person.svg'
import { useNavigate } from 'react-router-dom'
import { HOME, MATERIALS, PROFILE } from '../router/paths'

const Navbar = () => {
    const [isHomeActive, setIsHomeActive] = useState(true)
    const [isMaterialsActive, setIsMaterialsActive] = useState(false)
    const [isPersonActive, setIsPersonActive] = useState(false)

    const navigate = useNavigate()

    const HomeHander = () => {
        setIsHomeActive(true)
        setIsMaterialsActive(false)
        setIsPersonActive(false)
        navigate(HOME)
    }

    const MaterialsHander = () => {
        setIsHomeActive(false)
        setIsMaterialsActive(true)
        setIsPersonActive(false)
        navigate(MATERIALS)
    }

    const PersonHandler = () => {
        setIsHomeActive(false)
        setIsMaterialsActive(false)
        setIsPersonActive(true)
        navigate(PROFILE)
    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__link}>
                <RelatedToggleIcon
                    isActive={isHomeActive}
                    onClick={HomeHander}
                    src={cardsSvgSrs}
                    alt='cards'
                />
            </div>
            <div className={styles.mainBlock__link}>
                <RelatedToggleIcon
                    isActive={isMaterialsActive}
                    onClick={MaterialsHander}
                    src={bookSvgSrc}
                    width='25px'
                    height='25px'
                    alt='book' />
            </div>
            <div className={styles.mainBlock__link}>
                <RelatedToggleIcon
                    isActive={isPersonActive}
                    onClick={PersonHandler}
                    src={personSvgSrc}
                    alt='person' />
            </div>
        </div>
    )
}

export default Navbar