import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/Careers.module.css';

export default function Career({ career }) {
    return (
        <div className={styles.careerEntry}>
            <h2>{ career.fields.positionTitle }</h2>
            { documentToReactComponents(career.fields.positionDescription) }
            <style jsx>{`
            `}</style>
        </div>
    ) 
}