import Link from 'next/link'

function BrandNavLink({ brandName }) {

    let lowerCaseText = brandName.toLowerCase()
    let spacesRemoved = lowerCaseText.replace(/\s+/g, '')
    
    return (
    <>
      <div className='brandNavLink'>
        <Link href={`/brands/${spacesRemoved}`}>
            <p>{brandName}</p>
        </Link>   
      </div>
      <style jsx>{`
        .brandNavLink:nth-of-type(5) {
          grid-row-start: 3;
          grid-column-start: 1;
        }
        .brandNavLink:nth-of-type(6) {
          grid-row-start: 4;
          grid-column-start: 1;   
        }
        .brandNavLink {
          display: none;
        }
      `}</style>
    </>
    )
    
}
  
export default BrandNavLink