import { FC, useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/ui/Battery.module.scss'


interface Props {
    percent?: number
}

const Battery: FC<Props> = ({ percent = 50 }) => {
    const [progressHeigth, setPorgressHeight] = useState(percent)
    const bodyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setPorgressHeight(getProgressHeight())
    }, [])

    const fixPercent = (percent: number): number => {
        const OFFSET_OF_PROGRESS_CAP = 5
        const MIN = 0
        const MAX = 100
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
                <div className={styles.mainBlock__cap}>
                    { /*cap*/}
                </div>
                <div className={styles.mainBlock__body}
                    ref={bodyRef}>
                    { /*body*/}
                </div>
                <div className={styles.mainBlock__progress}
                    style={{
                        height: progressHeigth + 'px'
                    }}>
                    { /*progress*/}
                </div>
            </div>
        </div>
    )
}

export default Battery