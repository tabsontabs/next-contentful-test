import { createClient } from 'contentful'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../../components/nav';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../../styles/Campaign.module.css';

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
        <div className={styles.campaignPage}>
            <div className='navWrapper'>
            <Nav></Nav>
            </div>
            <div className={styles.campaignContentHolder}>
                <h1>{campaignTitle}</h1>
                <div className={styles.campaignImages}>
                    { images.map(x => (
                        <div>
                        <Image 
                            src={'https:' + x.fields.file.url}
                            width={x.fields.file.details.image.width}
                            height={x.fields.file.details.image.height}
                            key={x.fields.title}
                        />
                        </div>
                    ))}
                </div>
                {campaignVideoEmbedUrl !== undefined ? 
                <div className='campaignVideo'>    
                    <iframe src={campaignVideoEmbedUrl + '?rel=0&modestbranding=1'} title={campaignTitle + ' Video'} frameBorder="0" allowfullscreen></iframe>
                </div>
                :
                null }
                <div className={styles.campaignCredits}>
                    { documentToReactComponents(credits) }
                </div>
            <div className={styles.backLink}>
            <Link href={`/brands/${associatedBrand}`}>
                <p>Back to Clocks and Colours</p>
            </Link>   
            </div>    
            </div>
        </div>
        <style jsx>{`
            .campaignVideo {
                padding-top: ${videoAspectRatio == '4:3' ? '75%' : '56.25%'}; 
                width: 100%;
                position: relative;
                margin-top: 1rem;
            }
            .campaignVideo iframe {
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100%;
            }
        `}</style>     
        </>
  )
}