import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Career({ career }) {
    return (
        <div>
            <h2>{ career.fields.positionTitle }</h2>
            { documentToReactComponents(career.fields.positionDescription) }
            <style jsx>{`
            `}</style>
        </div>
    ) 
}