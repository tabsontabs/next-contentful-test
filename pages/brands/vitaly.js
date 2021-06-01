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

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const vitalyPage = await client.getEntries({ content_type: 'vitalyBrandPage'})

  const vitalyIGKey = process.env.VITALY_IG_FEED_TOKEN
  const mediaCall = await fetch(`https://graph.instagram.com/me/media?access_token=${vitalyIGKey}&fields=media_url,media_type,caption,permalink`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  const data = mediaCall.data
  
  return {
    props: {
      vitalyPage: vitalyPage.items,
      mediaData: data,
      // followerCount: followerCountCall
    },
    revalidate: 160
  }
}

export default function VitalyPage({ vitalyPage, mediaData, followerCount }) {
  
  let igGallery = mediaData.filter(media => media.media_type === "IMAGE" | media.media_type == "CAROUSEL_ALBUM");
  let igSlides = igGallery.map(i => (
        <SwiperSlide tag='li'>
        <a href={i.permalink} key={i.id} target="_blank" className={styles.igImageContainer}>
          <img className={styles.igImage} src={i.media_url} alt={i.caption}></img>
        </a>
        </SwiperSlide>
  )) 

  let celebGallery = vitalyPage.map(cg => (cg.fields.celebrityGallery))
  let cgSlides = celebGallery[0].map(cgImage => (
    <SwiperSlide tag='li'>
      <div key={cgImage.sys.id} className={styles.igImageContainer}>
          <img className={styles.igImage} src={'https:' + cgImage.fields.file.url} alt={cgImage.fields.title}></img>
      </div>
    </SwiperSlide>
  ))

  let fullCampaignArray = vitalyPage.map(x => (x.fields.creativeCampaigns))
  let slicedCampaignArray = fullCampaignArray.slice(0,1)

  return (
    <>
    <Head>
      <title>Compound - Vitaly</title>
    </Head>
    <div className={styles.singleBrandPage}>
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
                { documentToReactComponents(x.fields.brandInfo) }
                <Image 
                    src={'https:' + x.fields.featuredImage.fields.file.url}
                    width={x.fields.featuredImage.fields.file.details.image.width}
                    height={x.fields.featuredImage.fields.file.details.image.height}
                    className={styles.featuredImage}
                    alt={"vitaly logo"}
                />
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
            spaceBetween={30}
            slidesPerView={4}
            keyboard={{
              "enabled": true
            }}
            styles={'list-style:none;'}
          >
            {igSlides}
          </Swiper>
        </div>
        {/* <h3 className='igCount'>follow count goes here</h3> */}

        
        {vitalyPage[0].fields.celebrityGallery !== undefined ? 
          <>
          <h2>Worn By</h2>
          <div className='celebFeed'>
            <Swiper 
              tag='section' 
              wrapperTag='ul' 
              id='swiperMain' 
              navigation 
              slidesPerView={3}
              spaceBetween={30}
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
        }

        <h2>Recent Campaigns</h2>
        <div className='vitalyRecentCampaigns'>
        {
          slicedCampaignArray[0].map(y => (
                <Link href={`/brands/vitaly/${y.fields.slug}`} key={y.sys.id}>
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
        <style jsx>{`
            .vitalyRecentCampaigns {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 30px;
                padding-bottom: 30px;
            }
            `}</style>
        </div>
      </div>
    </div>
    
    </>
  )
}