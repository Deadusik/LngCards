import { FC } from "react";
import styles from '../../styles/components/card/FrontContent.module.scss'
// components
import CardIconButton from "../ui/button/CardIconButton";
import WordExample from "./WordExample";
// svg 
import { default as PlayButtonSvg } from '../../assets/svgs/sound.svg?react'
// utils
import { pronounceText } from "../../utils/functins";

interface Props {
    nativeWord: string
    foreignWord: string
    toForeignLanguage: boolean
    example?: string | null
    src?: string | null
}

const FrontContent: FC<Props> = ({
    nativeWord,
    foreignWord,
    example,
    src,
    toForeignLanguage = false
}) => {
    const frontWord = toForeignLanguage ? foreignWord : nativeWord

    return (
        <div className={styles.FrontContent}>
            {
                src && <img className={styles.FrontContent__picture /*extended*/} src={src} />
            }
            <div className={styles.FrontContent__wordBlock}>
                {toForeignLanguage && // add the ability to voice the word if it is foreign
                    <div className={styles.FrontContent__playButton}>
                        <CardIconButton content={PlayButtonSvg} onClick={() => pronounceText(frontWord)} isFrontSide={true} />
                    </div>
                }
                <h1 className={styles.FrontContent__word /*extended*/}>
                    {frontWord}
                </h1>
            </div>
            <div className={styles.FrontContent__example}>
                <WordExample
                    isHidden={!toForeignLanguage}
                    word={foreignWord}
                    example={example || ''} />
            </div>
        </div>
    )
}

export default FrontContent