import { FC } from 'react'
import styles from '../../../styles/components/section/home/LearnInfoSection.module.scss'
import { CardState } from '../../../utils/enum'
import LearnInfo from '../../ui/info/LearnInfo'

interface Props {
    setDialogType: React.Dispatch<React.SetStateAction<CardState>>
    setDialogVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const LearnInfoSection: FC<Props> = ({ setDialogType, setDialogVisibility }) => {
    const toLearnHendler = () => {
        setDialogType(CardState.toLearn)
        setDialogVisibility(true)
    }

    const knownHendler = () => {
        setDialogType(CardState.known)
        setDialogVisibility(true)
    }

    const learnedHendler = () => {
        setDialogType(CardState.learned)
        setDialogVisibility(true)
    }

    return (
        <div className={styles.mainBlock}>
            <LearnInfo modifierType={CardState.toLearn}
                onClick={toLearnHendler} />
            <LearnInfo modifierType={CardState.known}
                onClick={knownHendler} />
            <LearnInfo modifierType={CardState.learned}
                onClick={learnedHendler} />
        </div>
    )
}

export default LearnInfoSection