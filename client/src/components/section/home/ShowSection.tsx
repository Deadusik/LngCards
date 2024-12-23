import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/components/section/home/ShowSection.module.scss'
// components
import FloatingButton from '../../ui/button/FloatingButton'
import ShowContentAndSearchButton from '../../ui/button/ShowContentAndSearchButton'
import { NEW_CARD } from '../../../router/paths'


interface Props {
    isContentVisible: boolean
    isSearchActive: boolean
    setIsContentVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowSection: FC<Props> = ({ isContentVisible, isSearchActive, setIsContentVisible, setIsSearchActive }) => {
    const navigate = useNavigate()

    const SearchHandler = () => {
        setIsSearchActive(!isSearchActive)
    }

    const CardsHandler = () => {
        setIsContentVisible(!isContentVisible)
    }

    const AddHandler = () => {
        navigate(NEW_CARD)
    }

    return (
        <div className={styles.mainBlock}>
            <ShowContentAndSearchButton
                isContentVisible={isContentVisible}
                onCardsClick={CardsHandler}
                onSearchClick={SearchHandler} />
            <FloatingButton
                onClick={AddHandler} />
        </div>
    )
}

export default ShowSection 