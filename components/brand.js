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
            <div className="brandContent">
              <a>
              <Image 
                src={'https:' + imageForBrandsPage.fields.file.url}
                width={imageForBrandsPage.fields.file.details.image.width}
                height={imageForBrandsPage.fields.file.details.image.height}
                className="brandsPageFeaturedImage"
                alt={brandImageAlt}
              />
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
              padding-top: 5px;
            }
          }
          .Colours_logoContainer {
            width: 50%;
            padding-top: 5px;
          }
          .Vitaly_logoContainer {
            width: 25%;
          }
        `}</style>
      </div>
    )
}
  
export default Brand
  