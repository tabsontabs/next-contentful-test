import { useEffect, useState } from 'react'
import Head from 'next/head'
import Brand from '../components/brand'
import Nav from '../components/nav'

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

function BrandsPage() {
  async function fetchEntries() {
    const entries = await client.getEntries({
      content_type: 'brand'
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [brands, setBrands] = useState([])

  useEffect(() => {
    async function getBrands() {
      const allBrands = await fetchEntries()
      setBrands([...allBrands])
    }
    getBrands()
  }, [])

  return (
    <>
      <Head>
        <title>Compound Studios</title>
      </Head>
      <Nav></Nav>
      <h1>Brands</h1>
      <div className='brandsWrapper'>
        {brands.length > 0
          ? brands.map((b) => (
              <Brand
                brandImageAlt={b.fields.brandImageAlt}
                key={b.fields.brandName}
                brandImageURL={b.fields.brandImageURL}
                brandName={b.fields.brandName}
                brandPageImage={b.fields.brandPageImage}
              />
            ))
          : null}
      </div>
      <style jsx>{`
          .brandsWrapper {
            max-width: 1400px;
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column-reverse;
          }
        `}</style>
    </>
  )
}

export default BrandsPage
