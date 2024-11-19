import { FC } from "react";
import styles from '../../styles/components/card/BackContent.module.scss'
// components
import WordExample from "./WordExample";
import CardIconButton from "../ui/button/CardIconButton";
//svg
import { default as EditSvg } from '../../assets/svgs/edit.svg?react'
import { default as PlayButtonSvg } from '../../assets/svgs/sound.svg?react'
// utils
import { blue } from "../../utils/colors";
import { pronounceText } from "../../utils/functins";

interface Props {
    nativeWord: string
    foreignWord: string
    toForeignLanguage: boolean
    example?: string | null
    src?: string | null
}

const BackContent: FC<Props> = ({
    nativeWord,
    foreignWord,
    example,
    src,
    toForeignLanguage = false,
}) => {
    const frontWord = toForeignLanguage ? foreignWord : nativeWord
    const backWord = !toForeignLanguage ? foreignWord : nativeWord

    return (
        <div className={styles.BackContent}>
            {src && <img className={styles.BackContent__picture} src={src} />}
            <div className={styles.BackContent__wordBlock}>
                {toForeignLanguage && // add the ability to voice the word if it is foreign
                    <div className={styles.BackContent__playButton}>
                        <CardIconButton content={PlayButtonSvg} onClick={() => pronounceText(foreignWord)} isFrontSide={false} />
                    </div>
                }
                <p className={styles.BackContent__word}>
                    {frontWord}
                </p>
            </div>
            <div className={styles.BackContent__titleBlock}>
                {!toForeignLanguage && // remove the ability to voice the title word if it is not foreign
                    <div className={styles.BackContent__playButton}>
                        <CardIconButton content={PlayButtonSvg} onClick={() => pronounceText(backWord)} isFrontSide={false} />
                    </div>
                }
                <h1 className={styles.BackContent__title}>
                    {backWord}
                </h1>
            </div>
            {
                example &&
                <div className={styles.BackContent__exampleBlock}>
                    <div className={styles.Example}>
                        <hr className={styles.Example__divider} />
                        <div className={styles.Example__textBlock}>
                            <div className={styles.BackContent__playButton}>
                                <CardIconButton content={PlayButtonSvg} onClick={() => pronounceText(example || '')} />
                            </div>
                            <WordExample
                                isHidden={false}
                                word={foreignWord}
                                example={example || ''} />
                        </div>
                    </div>
                </div>
            }
            <div className={styles.BackContent__editButton}>
                <CardIconButton stroke={blue} fill='none' content={EditSvg} onClick={() => console.log('Edit click')} />
            </div>
        </div>
    )
}

export default BackContent