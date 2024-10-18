import { FC } from 'react'
import styles from '../../styles/components/card/CardContent.module.scss'
import WordExample from './WordExample'
import { pronounceText } from '../../utils/functins'
import CardPlayButton from '../ui/button/CardPlayButton'

interface IProps {
    nativeWord: string
    foreignWord: string
    isFrontContent: boolean
    toForeignLanguage: boolean
    isVisible: boolean
    example?: string | null
    src?: string | null
}

const CardContent: FC<IProps> = ({
    nativeWord,
    foreignWord,
    example,
    src,
    isFrontContent,
    toForeignLanguage = false,
    isVisible,
}) => {
    const frontWord = toForeignLanguage ? foreignWord : nativeWord
    const backWord = !toForeignLanguage ? foreignWord : nativeWord

    return (
        <>
            {
                isVisible &&
                <div className={styles.CardContent}>
                    {
                        isFrontContent ?
                            <div className={styles.FrontContent}>
                                {
                                    src && <img className={styles.CardContent__picture /*extended*/} src={src} />
                                }
                                <div className={styles.FrontContent__wordBlock}>
                                    {toForeignLanguage &&
                                        <div className={styles.FrontContent__playButton}>
                                            <CardPlayButton onClick={() => pronounceText(frontWord)} isFrontSide={true} />
                                        </div>
                                    }
                                    <h1 className={styles.CardContent__word /*extended*/}>
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
                            :
                            <div className={styles.BackContent}>
                                {src && <img className={styles.CardContent__picture} src={src} />}
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
                    }
                </div>
            }
        </>
    )
}

export default CardContent