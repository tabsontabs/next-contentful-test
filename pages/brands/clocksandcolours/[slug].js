import { createClient } from 'contentful'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../../components/nav';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({ content_type: 'creativeCampaign' })

    console.log(res.items)

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({ 
        content_type: 'creativeCampaign',
        'fields.slug': params.slug
    })

    return {
        props: {
            campaign: items[0]
        }
    }
}

export default function vitalyCampaign({ campaign }) {
    console.log(campaign)
    const { associatedBrand, campaignTitle, images, credits } = campaign.fields
    return (
        <>
        <Head>
            <title>{campaignTitle}</title>
        </Head>
        <Nav></Nav>
        <h1>{campaignTitle}</h1>
        <div className='campaignImages'>
            { images.map(x => (
                <Image 
                    src={'https:' + x.fields.file.url}
                    width={x.fields.file.details.image.width}
                    height={x.fields.file.details.image.height}
                    key={x.fields.title}
                />
            ))}
        </div>
        <div className='campaignCredits'>
            { documentToReactComponents(credits) }
        </div>
        <Link href={`/brands/${associatedBrand}`}>
            <p>Back to Clocks and Colours</p>
        </Link>   
        </>
  )
}