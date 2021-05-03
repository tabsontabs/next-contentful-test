import Head from 'next/head'
import Brand from '../components/brand'
import Nav from '../components/nav'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// const client = require('contentful').createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// })

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const brandsPage = await client.getEntries({ content_type: 'brandsPage'})

  return {
    props: {
      brandsPage: brandsPage.items
    }
  }
}

export default function BrandsPage({ brandsPage }) {
  console.log(brandsPage)
  return (
    <>
    <Head>
      <title>Compound - Brands</title>
    </Head>
    <div className='generalWrapper'>
      <Nav />
      <h1>Brands</h1>
      {
        brandsPage.map(x => (
          x.fields.brand.map(y => (
            <Brand key={y.sys.id} brand={y} />
          ))
        ))
      }
    </div>
    </>
  )
}

// function BrandsPage() {
//   async function fetchEntries() {
//     const entries = await client.getEntries({
//       content_type: 'brand'
//     })
//     if (entries.items) return entries.items
//     console.log(`Error getting Entries for ${contentType.name}.`)
//   }

//   const [brands, setBrands] = useState([])

//   useEffect(() => {
//     async function getBrands() {
//       const allBrands = await fetchEntries()
//       setBrands([...allBrands])
//     }
//     getBrands()
//   }, [])

//   return (
//     <>
//       <Head>
//         <title>Compound Studios</title>
//       </Head>
//       <Nav></Nav>
//       <h1>Brands</h1>
//       <div className='brandsWrapper'>
//         {brands.length > 0
//           ? brands.map((b) => (
//               <Brand
//                 brandImageAlt={b.fields.brandImageAlt}
//                 key={b.fields.brandName}
//                 brandImageURL={b.fields.brandImageURL}
//                 brandName={b.fields.brandName}
//                 brandPageImage={b.fields.brandPageImage}
//               />
//             ))
//           : null}
//       </div>
//       <style jsx>{`
//           .brandsWrapper {
//             max-width: 1400px;
//             width: 80%;
//             margin: 0 auto;
//             display: flex;
//             flex-direction: column-reverse;
//           }
//         `}</style>
//     </>
//   )
// }

// export default BrandsPage
