import { FC } from "react";
import styles from '../../styles/components/card/BackContent.module.scss'
import CardPlayButton from "../ui/button/CardPlayButton";
import { pronounceText } from "../../utils/functins";
import WordExample from "./WordExample";

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
                {toForeignLanguage &&
                    <div className={styles.BackContent__playButton}>
                        <CardPlayButton onClick={() => pronounceText(foreignWord)} isFrontSide={false} />
                    </div>
                }
                <p className={styles.BackContent__word}>
                    {frontWord}
                </p>
            </div>
            <div className={styles.BackContent__titleBlock}>
                {!toForeignLanguage &&
                    <div className={styles.BackContent__playButton}>
                        <CardPlayButton onClick={() => pronounceText(backWord)} isFrontSide={false} />
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
                                <CardPlayButton onClick={() => pronounceText(example || '')} isFrontSide={false} />
                            </div>
                            <WordExample
                                isHidden={false}
                                word={foreignWord}
                                example={example || ''} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default BackContent