import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/Brand.module.css';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const vitalyPage = await client.getEntries({ content_type: 'vitalyBrandPage'})

  return {
    props: {
      vitalyPage: vitalyPage.items
    }
  }
}

export default function VitalyPage({ vitalyPage }) {
  console.log(vitalyPage)
  return (
    <>
    <Head>
      <title>Compound - Vitaly</title>
    </Head>
    <div className='navWrapper'>
    <Nav />
    </div>
    <div className={styles.brandContentHolder}>
      <h1 className='visually-hidden'>Vitaly</h1>
      {
        vitalyPage.map(x => (
          <div className={styles.brandLogo} key={x.sys.id}>
            <Image
                  src={'https:' + x.fields.brandLogo.fields.file.url}
                  width={x.fields.brandLogo.fields.file.details.image.width}
                  height={x.fields.brandLogo.fields.file.details.image.height}
            />
          </div>
        ))
      }
      {
        vitalyPage.map(x => (
          <div className={styles.brandContent1} key={x.sys.id}>
              <Image 
                  src={'https:' + x.fields.featuredImage.fields.file.url}
                  width={x.fields.featuredImage.fields.file.details.image.width}
                  height={x.fields.featuredImage.fields.file.details.image.height}
                  className={styles.featuredImage}
                  alt={"vitaly logo"}
              />
              { documentToReactComponents(x.fields.brandInfo) }
          </div>
        ))
      }
      <div className="vitalyInstagram">IG FEED / COUNTER WILL GO HERE</div>
      <h2>Recent Campaigns</h2>
      <div className='vitalyRecentCampaigns'>
      {
        vitalyPage.map(x => (
          x.fields.creativeCampaigns.map(y => (
              <Link href={`/brands/vitaly/${y.fields.slug}`}>
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
      <style jsx>{`
          .vitalyRecentCampaigns {
              display: flex;
              justify-content: space-between;
          }
          .vitalyRecentCampaigns a {
              width: 48%;
              display: block;
          }
          `}</style>
      </div>
    </div>
    
    </>
  )
}