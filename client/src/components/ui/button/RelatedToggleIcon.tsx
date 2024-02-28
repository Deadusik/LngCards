import { FC } from 'react'
import styles from '../../../styles/components/ui/button/ToggleIcon.module.scss'
import { SPACE } from '../../../utils/constants'

interface Props {
    src: string
    isActive: boolean
    onClick: () => void
    width?: string
    height?: string
    alt?: string
}

const RelatedToggleIcon: FC<Props> = ({ src, width = 35, height = 35, alt = '', isActive, onClick }) => {
    return (
        <div className={styles.mainBlock}
            style={{
                width: width,
                height: height
            }}
            onClick={onClick}>
            {
                isActive ?
                    <img
                        className={[
                            styles.link,
                            styles.link_active
                        ].join(SPACE)}
                        src={src}
                        alt={alt} />
                    :
                    <img
                        className={styles.link}
                        src={src} />
            }
        </div>
    )
}

export default RelatedToggleIcon