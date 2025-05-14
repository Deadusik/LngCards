import { FC } from 'react'
import styles from '../../../styles/components/ui/button/SignInButton.module.scss'

interface Props {
    title: string
    SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    onClick: () => void
}

const SignInButton: FC<Props> = ({ title, onClick, SvgComponent }) => {
    return (
        <button onClick={onClick} className={styles.SignInButton}>
            <SvgComponent width={20} height={20} />
            <p className={styles.SignInButton__text}>{title}</p>
        </button>
    )
}

export default SignInButton