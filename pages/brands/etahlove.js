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
import Newfooter from '../../components/newfooter';

SwiperCore.use([Navigation, Keyboard]);

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const etahPage = await client.getEntries({ content_type: 'etahBrandPage'})

  const etahIGKey = process.env.ETAH_IG_FEED_TOKEN

  const mediaCall = await fetch(`https://graph.instagram.com/me/media?access_token=${etahIGKey}&fields=media_url,media_type,caption,permalink`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  const data = mediaCall.data

  return {
    props: {
      etahPage: etahPage.items,
      mediaData: data,
    }
  }
}

export default function etahPage({ etahPage, mediaData }) {

  let igGallery = mediaData.filter(media => media.media_type == "IMAGE" | media.media_type == "CAROUSEL_ALBUM");
  let igSlides = igGallery.map(i => (
        <SwiperSlide tag='li'>
        <a href={i.permalink} key={i.id} target="_blank" className={styles.igImageContainer}>
          <img className={styles.igImage} src={i.media_url} alt={i.caption}></img>
        </a>
        </SwiperSlide>
  )) 

  let celebGallery = etahPage.map(cg => (cg.fields.celebrityGallery))
  let cgSlides = celebGallery[0].map(cgImage => (
    <SwiperSlide tag='li'>
      <a href={cgImage.fields.description} target="_blank">
        <div key={cgImage.sys.id} className={styles.igImageContainer}>
            <img className={styles.igImage} src={'https:' + cgImage.fields.file.url} alt={cgImage.fields.title}></img>
        </div>
        <h3>{cgImage.fields.title} ></h3>
      </a>
    </SwiperSlide>
  ))

  let fullCampaignArray = etahPage.map(x => (x.fields.creativeCampaigns))
  let slicedCampaignArray = fullCampaignArray.slice(0,1)

  return (
    <>
    <Head>
      <title>Compound - Etah Love</title>
    </Head>
    <div className={styles.singleBrandPage}>
      <div className='navWrapper'>
        <Nav />
      </div>
      <div className={styles.brandContentHolder}>
      <h1 className='visually-hidden'>Etah Love</h1>
     
      {
        etahPage.map(x => (
          <div className={styles.brandTopSection} key={x.sys.id}>
            <div className={styles.logoAndInfoEtah}>
              <div className={styles.brandLogo} key={x.sys.id}>
                  <Image
                        src={'https:' + x.fields.brandLogo.fields.file.url}
                        width={x.fields.brandLogo.fields.file.details.image.width}
                        height={x.fields.brandLogo.fields.file.details.image.height}
                  />
              </div>
              <div className={styles.brandInfoText}>
                { documentToReactComponents(x.fields.brandInfo) }
                <a href={ x.fields.eCommerceLink } target="_blank">
                  Shop {x.fields.brandName} >
                </a>
              </div>
            </div>
            <Image 
                src={'https:' + x.fields.featuredImage.fields.file.url}
                width={x.fields.featuredImage.fields.file.details.image.width}
                height={x.fields.featuredImage.fields.file.details.image.height}
                className={styles.featuredImage}
            />
          </div>
        ))
      }
      

      <h2>Instagram</h2>
      <div className='igFeed'>
          <Swiper 
            tag='section' 
            wrapperTag='ul' 
            id='swiperMain' 
            navigation 
            spaceBetween={15}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
            keyboard={{
              "enabled": true
            }}
            styles={'list-style:none;'}
          >
            {igSlides}
          </Swiper>
          <a href='https://www.instagram.com/etahlove' target='_blank' className={styles.brandPageCTA}>Follow Us On Instagram ></a>
      </div>
      {/* <h3 className='igCount'>follow count goes here</h3> */}

      {etahPage[0].fields.celebrityGallery !== undefined ? 
      <>
        <h2>Worn By</h2>
        <div className={styles.celebFeed}>
          <Swiper 
            tag='section' 
            wrapperTag='ul' 
            id='swiperMain' 
            navigation 
            slidesPerView={2}
            spaceBetween={15}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
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
      <div className={styles.recentCampaigns}>
      {
        slicedCampaignArray[0].map(y => (
              // <Link href={`/brands/etahlove/${y.fields.slug}`}>
              //     <a>
              //         <Image
              //             src={'https:' + y.fields.featuredImage.fields.file.url}
              //             width={y.fields.featuredImage.fields.file.details.image.width}
              //             height={y.fields.featuredImage.fields.file.details.image.height}
              //         />
              //     </a>
              // </Link>
              <>
              <a href={y.fields.shopifyBlogLink} target="_blank" key={y.sys.id}>
                  <Image
                      src={'https:' + y.fields.featuredImage.fields.file.url}
                      width={y.fields.featuredImage.fields.file.details.image.width}
                      height={y.fields.featuredImage.fields.file.details.image.height}
                  />
                  <h3>{y.fields.campaignTitle} ></h3>
              </a>
              </>
          ))
      }
     
      </div>
      
      </div>
      <div className={styles.footerWrapper}>
      <Newfooter />
      </div>
    </div>
    </>
  )
}