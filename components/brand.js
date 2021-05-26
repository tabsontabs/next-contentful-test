import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BrandsPage.module.css'

function Brand({ brand }) {
    const { brandName, brandImageAlt, brandImageURL, imageForBrandsPage } = brand.fields

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
              <h2>{brandName}</h2>
              <button>See More >></button>
              </a>
            </div>
          </Link>
        <style jsx>{`
          .container {
            width: 100%;
            display: flex;
            padding-top: 4rem;
          }
          .container:nth-of-type(even) {
            text-align: right;
            flex-direction: row-reverse;
          }
          .brandContent {
            width: 60%;
          }
          h2 {
            font-size: 24px;
            margin-bottom: 0;
            cursor: pointer;
          }
          .container:last-of-type {
            padding-bottom: 4rem;
          }
          @media only screen and (max-width: 600px) {
            .container {
              padding-top: 1rem;
            }
            .container:last-of-type {
              padding-bottom: 1rem;
            }
          }
        `}</style>
      </div>
    )
}
  
export default Brand
  