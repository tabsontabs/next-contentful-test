import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link'
import Brand from '../components/brand'
import styles from '../styles/BrandsPage.module.css'
import Image from 'next/image'

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
                    <div className="container everyHeart_container">
                <div className='brandContent'>
              <a href="https://www.everyheart.com/" target="_blank">
              <div className='brandImageContainer everyHeart_imageContainer'>
              <Image 
                src='/eh_tile.png'
                width='2328'
                height='2910'
                className='brandsPageFeaturedImage'
                alt='every heart tile'
              />
              </div>
              <div className='brandLogoContainer everyHeart_logoContainer'>
                <Image 
                  src='/eh_logo_white_new.png'
                  width='509'
                  height='84'
                  className="brandsPageBrandLogo"
                  alt='every heart logo'
                />
              </div>
              <button className='brandSeeMore'>Now Live ></button>
              </a>
            </div>
                </div>
                </div>
                
            </div>
              : null
            }
            </>
            <style jsx>{`
            h2 {
              border-bottom: 1px solid white;
              line-height: 1;
              padding-bottom: 0px;
              margin-bottom: 28px;
            }

            @media only screen and (min-width: 600px) {
                h2 {
                  margin-bottom: 30px;
                }
              }

              .brandImageContainer div {
                border: 1px solid transparent;
              }
              
              .brandImageContainer div:hover {
                border: 1px solid white;
              }
              
              .brandLogoContainer {
                width: 30%;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 18px;
              }
              
              .brandSeeMore {
                font-size: 16px;
              }
              
              .everyHeart_logoContainer {
                width: 45%;
              }
    
              
              
              @media only screen and (min-width: 1600px) {
                .brandLogoContainer {
                  height: 4rem;
                }
              
                .brandSeeMore {
                  font-size: 24px;
                  padding-top: 1rem;
                }
              }
            `}</style>
        </div>
    ) 
}