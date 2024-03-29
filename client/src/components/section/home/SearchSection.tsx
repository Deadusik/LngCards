import { FC, useState } from 'react'
import styles from '../../../styles/components/section/home/SearchSection.module.scss'
import StateDropBox, { OptionsPlacement } from '../../ui/input/StateDropBox'
import TextInput from '../../ui/input/TextInput'
import { CardState } from '../../../utils/enum'

interface Props {
    isCardsShowed: boolean
}

const SearchSection: FC<Props> = ({ isCardsShowed }) => {
    const [cardState, setCardState] = useState<CardState>(CardState.none)
    const [searchText, setSearchText] = useState('')

    return (
        <div className={styles.mainBlock}>
            <StateDropBox
                cardState={cardState}
                setCardState={setCardState}
                // if cards block is hidden 
                // that show drop box on the top
                optionPlacement={
                    isCardsShowed ?
                        OptionsPlacement.default
                        :
                        OptionsPlacement.top
                } />
            <TextInput
                text={searchText}
                setText={setSearchText}
                placeholder='Search' />
        </div>
    )
}

export default SearchSection