import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BrandsPage.module.css'

function Brand({ brand }) {
    const { brandName, brandImageAlt, brandImageURL, imageForBrandsPage, brandLogo } = brand.fields

    let lowerCaseText = brandName.toLowerCase()
    let spacesRemoved = lowerCaseText.replace(/\s+/g, '')
    
    return (
      <div className="container">
          <Link href={`/brands/${spacesRemoved}`}>
            <div className={styles.brandContent}>
              <a>
              <div className={`${styles.brandImageContainer} ${brandName}_imageContainer`}>
              <Image 
                src={'https:' + imageForBrandsPage.fields.file.url}
                width={imageForBrandsPage.fields.file.details.image.width}
                height={imageForBrandsPage.fields.file.details.image.height}
                className={styles.brandsPageFeaturedImage}
                alt={brandImageAlt}
              />
              </div>
              <div className={`${styles.brandLogoContainer} ${brandName}_logoContainer`}>
                <Image 
                  src={'https:' + brandLogo.fields.file.url}
                  width={brandLogo.fields.file.details.image.width}
                  height={brandLogo.fields.file.details.image.height}
                  className="brandsPageBrandLogo"
                  alt={`${brandName} logo`}
                />
              </div>
              <button className={styles.brandSeeMore}>Explore {brandName} ></button>
              </a>
            </div>
          </Link>
        <style jsx>{`
          @media only screen and (min-width: 1000px) {
            .Colours_logoContainer {
              width: 45%;
            }
          }
          .Colours_logoContainer {
            width: 50%;
          }
          .Vitaly_logoContainer {
            width: 40%;
            justify-content: flex-start;
          }
        `}</style>
      </div>
    )
}
  
export default Brand
  