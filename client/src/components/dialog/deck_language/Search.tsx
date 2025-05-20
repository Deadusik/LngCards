import styles from '../../../styles/components/dialog/deck_language/Search.module.scss'
import { gray } from '../../../utils/colors'
// svg components
import { default as SearchSvg } from '../../../assets/svgs/search.svg?react'
import { default as CloseSvg } from '../../../assets/svgs/cross.svg?react'
import { default as DeleteSvg } from '../../../assets/svgs/delete.svg?react'
import { FC } from 'react'

interface Props {
    onChange: (text: string) => void
}

const Search: FC<Props> = ({ onChange }) => {
    return (
        <div className={styles.Search}>
            <SearchSvg width={20} height={20} stroke={gray} />
            <input
                onChange={e => onChange(e.target.value)}
                className={styles.Search__input}
                type='text'
                placeholder='Search' />
            <button className={styles.Search__button}>
                <DeleteSvg width={30} height={30} fill={gray} />
            </button>
            <button className={styles.Search__button}>
                <CloseSvg width={30} height={30} fill={gray} />
            </button>
        </div>
    )
}

export default Search