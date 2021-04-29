import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function AboutSubsection({ subAboutEntry }) {
    return (
        <div>
            <h2>{ subAboutEntry.fields.aboutSubsectionTitle }</h2>
            { documentToReactComponents(subAboutEntry.fields.aboutSubsection) }
            <style jsx>{`
            `}</style>
        </div>
    ) 
}