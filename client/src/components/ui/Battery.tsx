import { FC, useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/ui/Battery.module.scss'
import { CardState } from '../../utils/enum'
import { blue, lightBlue, green, lightGreen, yellow, lightYellow } from '../../utils/colors'

interface Props {
    percent?: number
    state?: CardState
}

interface Style {
    batteryColor: string
    progressColor: string
}

const Battery: FC<Props> = ({ percent = 0, state = CardState.none }) => {
    const [progressHeigth, setPorgressHeight] = useState(percent)
    const bodyRef = useRef<HTMLDivElement>(null)
    const OFFSET_OF_PROGRESS_CAP = 5
    const MIN = 0
    const MAX = 100

    const setColorStyles = (): Style => {
        switch (state) {
            case CardState.toLearn: {
                return {
                    batteryColor: lightGreen,
                    progressColor: green
                }
            }
            case CardState.known: {
                return {
                    batteryColor: lightBlue,
                    progressColor: blue
                }
            }
            case CardState.learned: {
                return {
                    batteryColor: lightYellow,
                    progressColor: yellow
                }
            }
            default: {
                return {
                    batteryColor: '',
                    progressColor: ''
                }
            }
        }
    }

    const colorStyle = setColorStyles()

    useEffect(() => {
        setPorgressHeight(getProgressHeight())
    }, [])

    const fixPercent = (percent: number): number => {
        const bodyPercent = percent + OFFSET_OF_PROGRESS_CAP

        if (bodyPercent < MIN) {
            return MIN
        }
        else if (bodyPercent > MAX) {
            return MAX
        }

        return bodyPercent
    }

    const getProgressHeight = (): number => {
        if (bodyRef.current) {
            return (bodyRef.current.getBoundingClientRect().height / 100 * (fixPercent(percent)))
        }
        return 0
    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__cap}
                    style={{
                        // fill cap if body progress is full
                        background: percent > (MAX - OFFSET_OF_PROGRESS_CAP) ?
                            colorStyle.progressColor : colorStyle.batteryColor
                    }}>
                    { /*cap*/}
                </div>
                <div className={styles.mainBlock__body}
                    ref={bodyRef}
                    style={{
                        background: colorStyle.batteryColor
                    }}>
                    { /*body*/}
                    <div className={styles.mainBlock__progress}
                        style={{
                            background: colorStyle.progressColor,
                            height: progressHeigth + 'px'
                        }}>
                        { /*progress*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Battery