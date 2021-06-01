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
              <div className={styles.brandLogoContainer}>
                <Image 
                  src={'https:' + brandLogo.fields.file.url}
                  width={brandLogo.fields.file.details.image.width}
                  height={brandLogo.fields.file.details.image.height}
                  className="brandsPageBrandLogo"
                  alt={`${brandName} logo`}
                />
              </div>
              <button>See More ></button>
              </a>
            </div>
          </Link>
        <style jsx>{`
          
        `}</style>
      </div>
    )
}
  
export default Brand
  