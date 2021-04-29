import Link from 'next/link'

function NavLink({ link }) {

    let linkLowerCaseText = link.toLowerCase()
    let linkSpacesRemoved = linkLowerCaseText.replace(/\s+/g, '')
    let linkClassName = link + '_link'
    
    return (
      <div className="nav" className={linkClassName}>
        <Link href={`/${linkSpacesRemoved}`}>
            <p>{link}</p>
        </Link>   
        <style jsx>{`
          .link {
            cursor: pointer;
            font-weight: bold;
          }
        `}</style>
      </div>
    )
    
}
  
export default NavLink
  