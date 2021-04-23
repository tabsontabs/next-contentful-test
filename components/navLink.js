import Link from 'next/link'

function NavLink({ link }) {

    let linkLowerCaseText = link.toLowerCase()
    let linkSpacesRemoved = linkLowerCaseText.replace(/\s+/g, '')

    return (
      <div className="nav">
        <Link href={`/${linkSpacesRemoved}`}>
            <p className='link'>{link}</p>
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
  