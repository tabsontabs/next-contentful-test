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

  let images = []
  let posts = []

  try {
    await igclient.login()
    const instagram = await igclient.getPhotosByUsername({
      username: 'clocksandcolours',
    })
    if (instagram["user"]["edge_owner_to_timeline_media"]["count"] > 0) {
      posts = instagram["user"]["edge_owner_to_timeline_media"]["edges"]
    }
  } catch (err) {
    console.log("something went wrong logging into IG", err)
  }

  let slicedPosts = posts.slice(0,3)  

  return {
    props: {
      clocksPage: clocksPage.items,
      instagramPosts: slicedPosts
    }
  }
}

export default function clocksPage({ clocksPage, instagramPosts }) {
  // console.log(clocksPage)
  console.log(instagramPosts)
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
      <div className="vitalyInstagram">
        <ul>
          {instagramPosts.map(({node}, i) => {
            return (
              <li>
                <a
                  href={`https://www.instagram.com/p/${node.shortcode}`}
                  key={i}
                  aria-label="View image on Instagram"
                >
                  <img
                    src={node.thumbnail_src}
                    alt={
                      // the caption with hashtags removed
                      node.edge_media_to_caption.edges[0].node.text
                        .replace(/(#\w+)+/g, "")
                        .trim()
                    }
                  />
                </a>
              </li>
            )
          })}
        </ul>
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