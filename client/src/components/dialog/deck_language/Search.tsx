import styles from '../../../styles/components/dialog/deck_language/Search.module.scss'
import { gray } from '../../../utils/colors'
// svg components
import { default as SearchSvg } from '../../../assets/svgs/search.svg?react'
import { default as CloseSvg } from '../../../assets/svgs/cross.svg?react'
import { default as DeleteSvg } from '../../../assets/svgs/delete.svg?react'
import { FC, useEffect, useState } from 'react'

interface Props {
    onChange: (text: string) => void
    onClose: () => void
}

const Search: FC<Props> = ({ onChange, onClose }) => {
    const [text, setText] = useState('')
    const inputRef = null

    const onClearHandler = () => {
        setText('')
    }

    const onChangeHandler = (text: string) => {
        setText(text)
    }

    useEffect(() => {
        onChange(text)
    }, [text])

    return (
        <div className={styles.Search}>
            <SearchSvg width={20} height={20} stroke={gray} />
            <input
                ref={inputRef}
                onChange={e => onChangeHandler(e.target.value)}
                className={styles.Search__input}
                type='text'
                value={text}
                placeholder='Search' />
            <button className={styles.Search__button} onClick={onClearHandler}>
                <DeleteSvg width={30} height={30} fill={gray} />
            </button>
            <button className={styles.Search__button} onClick={onClose}>
                <CloseSvg width={30} height={30} fill={gray} />
            </button>
        </div>
    )
}

export default Search