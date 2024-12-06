import styles from '../styles/components/Topbar.module.scss'
import LanguageDropBox from './ui/dropbox/LanguageDropBox'

const Topbar = () => {
    return (
        <div className={styles.mainBlock}>
            <h1>Topbar</h1>
            <LanguageDropBox foreignCountryCode='gb' nativeCountryCode='ua' />
        </div>
    )
}

export default Topbar