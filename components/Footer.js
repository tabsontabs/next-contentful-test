import styles from '../styles/Footer.module.css';

function Footer() {
    return (
        <>
        <div className={styles.desktopFooterDiv}>
            <p>Compound Studio | 505 Queen St. West. Toronto, Canada</p>
            <p><a href='https://www.linkedin.com/company/compoundstudio/about/' target='_blank'>LinkedIn</a> | <a href='#'>Instagram</a></p>
        </div>
        <div className={styles.mobileFooterDiv}>
            <p>Compound Studio</p>
            <p>505 Queen St. West. Toronto, Canada</p>
            <p className={styles.socialMedia}><a href='https://www.linkedin.com/company/compoundstudio/about/' target='_blank'>LinkedIn</a> | <a href='#'>Instagram</a></p>
        </div>
        </>
    )
}

export default Footer