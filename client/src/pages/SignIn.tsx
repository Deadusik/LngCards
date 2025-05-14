import SignInButton from '../components/ui/button/SignInButton'
import styles from '../styles/pages/SignIn.module.scss'
// svg 
import { default as Google } from '../assets/svgs/social/google.svg?react'
import { default as Email } from '../assets/svgs/social/email.svg?react'

const SignIn = () => {

    const signInGoogleHandler = () => {
        // dev note: sign in with google logic
    }

    const signInEmailHandler = () => {
        // dev note: sign in with email logic
    }

    return (
        <div className={styles.SignIn}>
            <div className={styles.SignIn__content}>
                { /* nabar block */}
                <div className={styles.SignIn__navbarBlock}>
                    navbar block
                </div>
                { /* page decoration */}
                <div className={styles.SignIn__decorationBlock}>
                    decoration block
                </div>
                { /* sign in buttons block */}
                <div className={styles.SignIn__socialBlock}>
                    <SignInButton
                        title='CONTINUE WITH GOOGLE'
                        SvgComponent={Google}
                        onClick={signInGoogleHandler} />
                    <SignInButton
                        title='CONTINUE WITH EMAIL'
                        SvgComponent={Email}
                        onClick={signInEmailHandler} />
                </div>
            </div>
        </div>
    )
}

export default SignIn