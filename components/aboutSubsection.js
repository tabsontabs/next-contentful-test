import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link'
import Brand from '../components/brand'
import styles from '../styles/BrandsPage.module.css'

export default function AboutSubsection({ subAboutEntry }) {
    
    return (
        <div style={styles.aboutSubsectionContainer}>
            <>
            
            <h2>{ subAboutEntry.fields.aboutSubsectionTitle }</h2>
            { documentToReactComponents(subAboutEntry.fields.aboutSubsection) }
            { subAboutEntry.fields.aboutSubsectionCta && subAboutEntry.fields.aboutSubsectionCtaUrlSlug ? 
              <Link href={`/${subAboutEntry.fields.aboutSubsectionCtaUrlSlug}`}>
                {subAboutEntry.fields.aboutSubsectionCta}
              </Link>
              : null
            }
            { subAboutEntry.fields.aboutSubsectionBrands ? 
            <div className={styles.brandsWrapper}>
                <div className={styles.aboutSubsectionBrandsGrid}>
                    {subAboutEntry.fields.aboutSubsectionBrands.map(brand => (
                        <Brand brand={brand} key={brand.sys.id}/>
                    ))}
                </div>
            </div>
              : null
            }
            </>
            <style jsx>{`
              h2 {
                border-bottom: 1px solid white;
                padding-bottom: 0;
                margin-bottom: 2rem;
                line-height: 0.7;
              }
              @media only screen and (min-width: 1600px) {
                h2 {
                  padding-bottom: 1rem;
                  margin-bottom: 2.5rem;
                }
              }
            `}</style>
        </div>
    ) 
}