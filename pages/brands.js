import Head from 'next/head'
import Brand from '../components/brand'
import Nav from '../components/nav'
import { createClient } from 'contentful'
import styles from '../styles/BrandsPage.module.css'
import Newfooter from '../components/newfooter';

import Image from 'next/image'

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
      <div className={`${styles.brandsPageGeneralWrapper} generalWrapper`}>
        <h1 className={styles.brandsPageH1}>Brands</h1>
        <section className={styles.brandsWrapper}>
          <div className={styles.brandsGrid}>
          {
            brandsPage.map(x => (
              x.fields.brand.map(y => (
                <Brand key={y.sys.id} brand={y} />
              ))
            ))
          }
          <div className="container everyHeart_container">
          
            <div className='brandContent'>
              <a href="https://www.everyheart.com/" target="_blank">
              <div className='brandImageContainer everyHeart_imageContainer'>
              <Image 
                src='/eh_tile.png'
                width='2328'
                height='2910'
                className='brandsPageFeaturedImage'
                alt='every heart tile'
              />
              </div>
              <div className='brandLogoContainer everyHeart_logoContainer'>
                <Image 
                  src='/eh_logo_white_new.png'
                  width='509'
                  height='84'
                  className="brandsPageBrandLogo"
                  alt='every heart logo'
                />
              </div>
              <button className='brandSeeMore'>Now Live ></button>
              </a>
            </div>
        <style jsx>{`
          @media only screen and (min-width: 1000px) {
            .Colours_logoContainer {
              width: 45%;
            }
          }
          .Colours_logoContainer {
            width: 50%;
          }
          .Vitaly_logoContainer {
            width: 25%;
          }
          
          .brandImageContainer div {
            border: 1px solid transparent;
          }
          
          .brandImageContainer div:hover {
            border: 1px solid white;
          }
          
          .brandLogoContainer {
            width: 30%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 18px;
          }
          
          .brandSeeMore {
            font-size: 16px;
          }
          
          .everyHeart_logoContainer {
            width: 45%;
          }

          .everyHeart_container:hover, .everyHeart_container .brandContent:hover, .everyHeart_container a:hover, .everyHeart_comingSoon:hover {
            cursor: not-allowed;
          }
          
          @media only screen and (min-width: 1600px) {
            .brandLogoContainer {
              height: 4rem;
            }
          
            .brandSeeMore {
              font-size: 24px;
              padding-top: 1rem;
            }
          }
          
         
          }
        `}</style>
      </div>
          </div>
        </section>
        <Newfooter/>
      </div>
    </div>
    </>
  )
}
