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
    <Nav />
    <h1>Vitaly</h1>
    {
      vitalyPage.map(x => (
        <div className='vitalyPageContent1' key={x.sys.id}>
            <Image 
                src={'https:' + x.fields.featuredImage.fields.file.url}
                width={x.fields.featuredImage.fields.file.details.image.width}
                height={x.fields.featuredImage.fields.file.details.image.height}
                className="vitalyFeaturedImage"
            />
            { documentToReactComponents(x.fields.brandInfo) }
            {/* <Link href={`/brands/vitaly/${x.fields.creativeCampaigns.fields.slug}`}>
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
    
    </>
  )
}