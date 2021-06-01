import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/Careers.module.css';

export default function Career({ career }) {
    return (
            <>
            <h2 className={styles.positionTitle}>{ career.fields.positionTitle }
                <span className={styles.collapsiblePlus}>+</span>
            </h2>
            
            <div className={styles.positionText}>
                { documentToReactComponents(career.fields.positionDescription) }
            </div>
            </>
    ) 
}