import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const etahPage = await client.getEntries({ content_type: 'etahBrandPage'})

  return {
    props: {
      etahPage: etahPage.items
    }
  }
}

export default function etahPage({ etahPage }) {
  console.log(etahPage)
  return (
    <>
    <Head>
      <title>Compound - Etah Love</title>
    </Head>
    <Nav />
    <h1>Etah Love</h1>
    {
      etahPage.map(x => (
        <div className='etahPageContent1' key={x.sys.id}>
            <Image 
                src={'https:' + x.fields.featuredImage.fields.file.url}
                width={x.fields.featuredImage.fields.file.details.image.width}
                height={x.fields.featuredImage.fields.file.details.image.height}
                className="etahFeaturedImage"
            />
            { documentToReactComponents(x.fields.brandInfo) }
            {/* <Link href={`/brands/etah/${x.fields.creativeCampaigns.fields.slug}`}>
                <a>
                    <Image
                        src={'https:' + x.fields.creativeCampaigns.fields.featuredImage.fields.file.url}
                        width={x.fields.creativeCampaigns.fields.featuredImage.fields.file.details.image.width}
                        height={x.fields.creativeCampaigns.fields.featuredImage.fields.file.details.image.height}
                    />
                </a>
            </Link> */}
        </div>
      ))
    }
    <div className="vitalyInstagram">IG FEED / COUNTER WILL GO HERE</div>
    <h2>Recent Campaigns</h2>
    <div className='etahRecentCampaigns'>
    {
      etahPage.map(x => (
        x.fields.creativeCampaigns.map(y => (
            <Link href={`/brands/etahlove/${y.fields.slug}`}>
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
        .etahRecentCampaigns {
            display: flex;
            justify-content: space-between;
        }
        .etahRecentCampaigns a {
            width: 48%;
            display: block;
        }
        `}</style>
    </div>
    
    </>
  )
}