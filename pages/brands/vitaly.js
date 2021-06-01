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
      <a href={cgImage.fields.description} target="_blank"><h3>{cgImage.fields.title} ></h3></a>
    </SwiperSlide>
  ))

  let pressGallery = vitalyPage.map(pg => (pg.fields.press))
  let pressSlides = pressGallery[0].map(article => (
    <SwiperSlide tag='li'>
      <div key={article.sys.id} className={styles.pressImageContainer}>
          <img className={styles.pressImage} src={'https:' + article.fields.file.url} alt={article.fields.title}></img>
      </div>
      <a href={article.fields.description} target="_blank"><h3>{article.fields.title} ></h3></a>
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
                <a href={ x.fields.eCommerceLink } target="_blank">
                  SHOP >
                </a>
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

        <h2>Instagram Feed</h2>
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
        </div>
        <a href='https://www.instagram.com/vitaly' target='_blank' className={styles.brandPageCTA}>Follow Us On Instagram ></a>
        {/* <h3 className='igCount'>follow count goes here</h3> */}

        {vitalyPage[0].fields.celebrityGallery !== undefined ? 
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

        {vitalyPage[0].fields.press !== undefined ? 
          <>
          <h2>Press</h2>
          <div className={`pressFeed ${styles.pressFeed}`}>
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
              {pressSlides}
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
                // <Link href={`/brands/vitaly/${y.fields.slug}`} key={y.sys.id}>
                //     <a>
                //         <Image
                //             src={'https:' + y.fields.featuredImage.fields.file.url}
                //             width={y.fields.featuredImage.fields.file.details.image.width}
                //             height={y.fields.featuredImage.fields.file.details.image.height}
                //         />
                //     </a>
                //     <h3>{y.fields.campaignTitle}</h3>
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
    </div>
    
    </>
  )
}