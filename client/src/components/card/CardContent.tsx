import { FC } from 'react'
import styles from '../../styles/components/card/CardContent.module.scss'
import PlayButton from '../ui/button/PlayButton'
import playSvgSrc from '../../assets/svgs/sound.svg'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import WordExample from './WordExample'

interface IProps {
    nativeWord: string
    foreignWord: string
    isFrontContent: boolean
    toForeignLanguage?: boolean
    example?: string | null
}

const CardContent: FC<IProps> = ({
    nativeWord,
    foreignWord,
    example,
    isFrontContent,
    toForeignLanguage = true,
}) => {
    return (
        <div className={styles.CardContent}>
            {
                isFrontContent ?
                    <div className={styles.FrontContent}>
                        <img className={styles.CardContent__picture /*extended*/} src={testImgSrc} />
                        <div className={styles.FrontContent__wordBlock}>
                            {toForeignLanguage &&
                                <div className={styles.FrontContent__playButton}>
                                    <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
                                </div>
                            }
                            <h1 className={styles.CardContent__word /*extended*/}>
                                {toForeignLanguage ?
                                    foreignWord : nativeWord
                                }
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
                        <img className={styles.CardContent__picture} src={testImgSrc} />
                        <div className={styles.BackContent__wordBlock}>
                            {toForeignLanguage &&
                                <div className={styles.BackContent__playButton}>
                                    <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
                                </div>
                            }
                            <p className={styles.BackContent__word}>
                                {toForeignLanguage ? foreignWord : nativeWord}
                            </p>
                        </div>
                        <div className={styles.BackContent__titleBlock}>
                            {!toForeignLanguage &&
                                <div className={styles.BackContent__playButton}>
                                    <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
                                </div>
                            }
                            <h1 className={styles.BackContent__title}>
                                {!toForeignLanguage ? foreignWord : nativeWord}
                            </h1>
                        </div>
                        {
                            example &&
                            <div className={styles.BackContent__exampleBlock}>
                                <div className={styles.Example}>
                                    <hr className={styles.Example__divider} />
                                    <div className={styles.Example__textBlock}>
                                        <div className={styles.BackContent__playButton}>
                                            <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
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
    )
}

export default CardContent