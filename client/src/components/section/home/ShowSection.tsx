import { FC } from 'react'
import styles from '../../../styles/components/section/home/ShowSection.module.scss'
import FloatingButton from '../../ui/button/FloatingButton'
import ShowContentAndSearchButton from '../../ui/button/ShowContentAndSearchButton'

interface Props {
    isContentVisible: boolean
    isSearchActive: boolean
    setIsContentVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowSection: FC<Props> = ({ isContentVisible, isSearchActive, setIsContentVisible, setIsSearchActive }) => {
    const searchHandle = () => {
        setIsSearchActive(!isSearchActive)
    }

    const cardsHandle = () => {
        setIsContentVisible(!isContentVisible)
    }

    return (
        <div className={styles.mainBlock}>
            <ShowContentAndSearchButton
                isContentVisible={isContentVisible}
                onCardsClick={cardsHandle}
                onSearchClick={searchHandle} />
            <FloatingButton />
        </div>
    )
}

export default ShowSection 