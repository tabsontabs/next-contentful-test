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
        @media only screen and (max-width: 700px) {
          .navLink {
            padding-bottom: 3rem;
          }
          .navLink:last-of-type {
            padding-bottom: 0;
          }
        }
      `}</style>
      </>
    )
    
}
  
export default NavLink
  