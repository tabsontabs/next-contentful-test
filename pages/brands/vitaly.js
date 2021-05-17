import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/Brand.module.css';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide, SwiperSlider } from 'swiper/react';

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

  // const followerCountCall = await fetch(`https://www.instagram.com/vitaly/?__a=1`, {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   }
  // }).then((response) => response.json());

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

  const slides = mediaData.map(i => (
        <SwiperSlide>
        <a href={i.permalink} key={i.id} target="_blank">
          <Image
            src={i.media_url}
            alt={i.caption}
            width={400}
            height={400}
          />
        </a>
        </SwiperSlide>
  )) 
  
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
        
        {/* <div className='igFeed'>
        {
          data.map(i => (
            <a href={i.permalink} key={i.id} target="_blank">
              <Image
                src={i.media_url}
                alt={i.caption}
                width={400}
                height={400}
              />
            </a>
          ))
        }
        </div> */}

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
          >
            {slides}
          </Swiper>
        </div>
        {/* <h2 className='igCount'>{followerCount}</h2> */}

        <h2>Recent Campaigns</h2>
        <div className='vitalyRecentCampaigns'>
        {
          vitalyPage.map(x => (
            x.fields.creativeCampaigns.map(y => (
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
    </div>
    
    </>
  )
}