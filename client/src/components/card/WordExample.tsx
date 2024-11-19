import React, { FC } from 'react'
import styles from '../../styles/components/card/WordExample.module.scss'
// utils
import { SPACE } from '../../utils/constants'

interface IProps {
    word: string
    example: string
    isHidden: boolean
}

const WordExample: FC<IProps> = ({ word, example, isHidden }) => {
    return (
        <p className={styles.WordExample}>
            {example.split(SPACE).map((exampleWord, index, arr) => {
                return (
                    <React.Fragment key={index}>
                        { // compare word with exapleWord if true then select (set red text) 
                            exampleWord.toLocaleLowerCase() !== word.toLocaleLowerCase() ?
                                <>{exampleWord}</>
                                :
                                <span key={index} className={styles.WordExample__span}>
                                    {isHidden ? '___' : exampleWord}
                                </span>
                        }
                        {index < arr.length - 1 && ' '}
                    </React.Fragment>
                )
            })}
        </p>
    )
}

export default WordExample