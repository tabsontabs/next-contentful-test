import Link from 'next/link'

function Brand({ brandName, brandImageURL, brandImageAlt, brandPageImage }) {

    let lowerCaseText = brandName.toLowerCase()
    let spacesRemoved = lowerCaseText.replace(/\s+/g, '')
    
    return (
      <div className="container">
        <img alt={brandImageAlt} src={brandImageURL} />
        <div>{brandPageImage}</div>
        <div className="text">
          <Link href={`/brands/${spacesRemoved}`}>
            <h2>{brandName}</h2>
          </Link>
        </div>
        <style jsx>{`
          .container {
            
            height: auto;
            margin-bottom: 48px;
          }
          .container img {
            width: 50vw;
          }
          .container:nth-of-type(even) {
            text-align: right;
          }
          h2 {
            color: black;
            font-size: 24px;
            margin-bottom: 0;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
}
  
export default Brand
  