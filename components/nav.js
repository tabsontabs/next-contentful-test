import { useEffect, useState } from 'react'
import NavLink from '../components/navLink'

const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})
  
function Nav() {
    async function fetchEntries() {
      const entries = await client.getEntries({
        content_type: 'nav'
      })
      if (entries.items[0].fields.navLinks) return entries.items[0].fields.navLinks
    }
  
    const [navLinks, setNavLinks] = useState([])
    
  
    useEffect(() => {
      async function getNavLink() {
        const allNavLink = await fetchEntries()
        setNavLinks([...allNavLink])
      }
      getNavLink()
    }, [])
    
    return (
      <>
        <div className='navLinkWrapper'>
          {navLinks.length > 0
            ? navLinks.map((x) => (
                <NavLink
                  title={x.fields.link}
                  slug={x.fields.slug}
                  key={x.fields.link}
                />
              ))
            : null}
        </div>
        <style jsx>{`
            .navLinkWrapper {
              display: flex;
              justify-content: space-between;
            }
          `}</style>
      </>
    )
  }
  
  export default Nav