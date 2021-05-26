import Link from 'next/link'

function NavLink({ slug, title }) {

    let slugLowerCaseText = slug.toLowerCase()
    let titleLowerCaseText = title.toLowerCase()
    let slugClassName = titleLowerCaseText + '_link'
    
    return (
      <>
      <div className="nav" className={slugClassName}>
        <Link href={`${slugLowerCaseText}`}>
            <p>{title}</p>
        </Link>   
      </div>
      <style jsx>{`
        .careers_link {
          justify-self: center;
        }
        .contact_link {
          justify-self: end;
        }
      `}</style>
      </>
    )
    
}
  
export default NavLink
  