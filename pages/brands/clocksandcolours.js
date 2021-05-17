import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/Brand.module.css';

export async function getStaticProps() {

  // get Contentful data
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const clocksPage = await client.getEntries({ content_type: 'clocksBrandPage'})

  return {
    props: {
      clocksPage: clocksPage.items
    }
  }
}

export default function clocksPage({ clocksPage, instagramPosts }) {
  return (
    <>
    <Head>
      <title>Compound - Clocks and Colours</title>
    </Head>
    <div className={styles.singleBrandPage}>
      <div className='navWrapper'>
        <Nav />
      </div>
      <h1 className='visually-hidden'>Clocks and Colours</h1>
      {/* LOGO: */}
      {/* {
          clocksPage.map(x => (
            <div className={styles.brandLogo} key={x.sys.id}>
              <Image
                    src={'https:' + x.fields.brandLogo.fields.file.url}
                    width={x.fields.brandLogo.fields.file.details.image.width}
                    height={x.fields.brandLogo.fields.file.details.image.height}
              />
            </div>
          ))
      } */}
      {
        clocksPage.map(x => (
          <div className='clocksPageContent1' key={x.sys.id}>
              <Image 
                  src={'https:' + x.fields.featuredImage.fields.file.url}
                  width={x.fields.featuredImage.fields.file.details.image.width}
                  height={x.fields.featuredImage.fields.file.details.image.height}
                  className="clocksFeaturedImage"
              />
              { documentToReactComponents(x.fields.brandInfo) }
          </div>
        ))
      }
      <div className="clocksInstagram">
        
      </div>
      <h2>Recent Campaigns</h2>
      <div className='clocksRecentCampaigns'>
      {
        clocksPage.map(x => (
          x.fields.creativeCampaigns.map(y => (
              <Link href={`/brands/clocksandcolours/${y.fields.slug}`}>
                  <a>
                      <Image
                          src={'https:' + y.fields.featuredImage.fields.file.url}
                          width={y.fields.featuredImage.fields.file.details.image.width}
                          height={y.fields.featuredImage.fields.file.details.image.height}
                      />
                  </a>
              </Link>
          ))
        ))
      }
      </div>
      <style jsx>{`
          .clocksRecentCampaigns {
              display: flex;
              justify-content: space-between;
          }
          .clocksRecentCampaigns a {
              width: 48%;
              display: block;
          }
          `}</style>
      </div>
    
    </>
  )
}