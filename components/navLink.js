import Link from 'next/link'

function NavLink({ slug, title }) {

    let slugLowerCaseText = slug.toLowerCase()
    let titleLowerCaseText = title.toLowerCase()
    let slugClassName = titleLowerCaseText + '_link'
    
    return (
      <div className="nav" className={slugClassName}>
        <Link href={`${slugLowerCaseText}`}>
            <p>{title}</p>
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
  