import styles from '../../../styles/components/ui/dropbox/LanguageDropBox.module.scss'
import { default as ArrowSvg } from '../../../assets/svgs/arrow_up.svg?react'
import { FC, useState } from 'react'
import { getCountryName } from '../../../utils/functins'
import { SPACE } from '../../../utils/constants'

interface Props {
    nativeCountryCode: string
    foreignCountryCode: string
}

const LanguageDropBox: FC<Props> = ({ nativeCountryCode, foreignCountryCode }) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const foreignFlagUrl = `https://flagcdn.com/20x15/${foreignCountryCode}.png`
    const nativeFlagUrl = `https://flagcdn.com/16x12/${nativeCountryCode}.png`
    const foreignCountryName = getCountryName(foreignCountryCode)

    return (
        <div className={
            styles.LanguageDropBox
        }>
            <div className={styles.LanguageDropBox__content}>
                { /* button to open/close menu */}
                <button className={styles.LanguageDropBox__button}
                    onClick={() => setIsActive(!isActive)}>
                    <div className={styles.LanguageDropBox__flagsBlock}>
                        <img className={styles.LanguageDropBox__foreignFlag} src={foreignFlagUrl} />
                        <img className={styles.LanguageDropBox__nativeFlag} src={nativeFlagUrl} />
                    </div>
                    <h1 className={styles.LanguageDropBox__label}>
                        {foreignCountryName}
                    </h1>
                    <div className={
                        isActive ?
                            styles.LanguageDropBox__arrow
                            :
                            [styles.LanguageDropBox__arrow, styles.LanguageDropBox__arrow_active].join(SPACE)
                    }>
                        <ArrowSvg width={20} height={20} />
                    </div>
                </button>
                { /* dropbox menu */}
                <div className={styles.Menu}>
                    <div className={styles.Menu__item}>

                    </div>
                    <div className={styles.Menu__item}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguageDropBox