import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/Brand.module.css';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


SwiperCore.use([Navigation, Keyboard]);

export async function getStaticProps() {

  // get Contentful data
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const clocksPage = await client.getEntries({ content_type: 'clocksBrandPage'})

  const clocksIGKey = process.env.CLOCKS_IG_FEED_TOKEN

  const mediaCall = await fetch(`https://graph.instagram.com/me/media?access_token=${clocksIGKey}&fields=media_url,media_type,caption,permalink`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  const data = mediaCall.data

  return {
    props: {
      clocksPage: clocksPage.items,
      mediaData: data,
    }
  }
}

export default function clocksPage({ clocksPage, mediaData }) {
  
  let igGallery = mediaData.filter(media => media.media_type == "IMAGE" | media.media_type == "CAROUSEL_ALBUM");
  let igSlides = igGallery.map(i => (
        <SwiperSlide tag='li'>
        <a href={i.permalink} key={i.id} target="_blank" className={styles.igImageContainer}>
          <img className={styles.igImage} src={i.media_url} alt={i.caption}></img>
        </a>
        </SwiperSlide>
  )) 

  let fullCampaignArray = clocksPage.map(x => (x.fields.creativeCampaigns))
  let slicedCampaignArray = fullCampaignArray.slice(0,1)

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
     
      <h2>Follow Us On Instagram</h2>
      <div className='igFeed'>
          <Swiper 
            tag='section' 
            wrapperTag='ul' 
            id='swiperMain' 
            navigation 
            slidesPerView={3}
            keyboard={{
              "enabled": true
            }}
            styles={'list-style:none;'}
          >
            {igSlides}
          </Swiper>
      </div>
      <h3 className='igCount'>follow count goes here</h3>
      

      {/* {clocksPage[0].fields.celebrityGallery !== undefined ? 
      <>
        <h2>Worn By</h2>
        <div className='igFeed'>
          <Swiper 
            tag='section' 
            wrapperTag='ul' 
            id='swiperMain' 
            navigation 
            slidesPerView={3}
            keyboard={{
              "enabled": true
            }}
            styles={'list-style:none;'}
          >
            {cgSlides}
          </Swiper>
        </div>
      </>
      :
      null
      } */}

      <h2>Recent Campaigns</h2>
      <div className='clocksRecentCampaigns'>
      {
        slicedCampaignArray[0].map(y => (
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