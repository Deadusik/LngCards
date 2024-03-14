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

    const homeHender = () => {
        setIsHomeActive(true)
        setIsMaterialsActive(false)
        setIsPersonActive(false)
        navigate(HOME)
    }

    const materialsHender = () => {
        setIsHomeActive(false)
        setIsMaterialsActive(true)
        setIsPersonActive(false)
        navigate(MATERIALS)
    }

    const personHendler = () => {
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
                    onClick={homeHender}
                    src={cardsSvgSrs}
                    alt='cards'
                />
            </div>
            <div className={styles.mainBlock__link}>
                <RelatedToggleIcon
                    isActive={isMaterialsActive}
                    onClick={materialsHender}
                    src={bookSvgSrc}
                    width='25px'
                    height='25px'
                    alt='book' />
            </div>
            <div className={styles.mainBlock__link}>
                <RelatedToggleIcon
                    isActive={isPersonActive}
                    onClick={personHendler}
                    src={personSvgSrc}
                    alt='person' />
            </div>
        </div>
    )
}

export default Navbar