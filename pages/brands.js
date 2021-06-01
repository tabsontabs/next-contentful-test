import Head from 'next/head'
import Brand from '../components/brand'
import Nav from '../components/nav'
import { createClient } from 'contentful'
import styles from '../styles/BrandsPage.module.css'

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
    <div className={styles.brandsPage}>
      <div className='navWrapper'>
        <Nav />
      </div>
      <div className='generalWrapper'>
        <h1 className='visually-hidden'>Brands</h1>
        <section className={styles.brandsWrapper}>
          <div className={styles.brandsGrid}>
          {
            brandsPage.map(x => (
              x.fields.brand.map(y => (
                <Brand key={y.sys.id} brand={y} />
              ))
            ))
          }
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
