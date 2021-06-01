import Link from 'next/link'
import {useRouter} from 'next/router'

function NavLink({ slug, title }) {

    let slugLowerCaseText = slug.toLowerCase()
    let titleLowerCaseText = title.toLowerCase()
    let slugClassName = titleLowerCaseText + '_link'

    const router = useRouter();

    
    
    return (
      <>
      <div 
      className={router.pathname == `/${titleLowerCaseText}` ? `${slugClassName} navLink activeNavLink` : `${slugClassName} navLink`}
      >
        <Link href={`${slugLowerCaseText}`}>
            <p>{title}</p>
        </Link>   
      </div>
      <style jsx>{`
        .navLink {
          text-transform: capitalize;
        }
        .activeNavLink {
          text-decoration: underline;
        }
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
  