import Head from 'next/head';
import Nav from '../components/nav';
import AboutSubsection from '../components/aboutSubsection';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const response = await client.getEntries({ content_type: 'aboutPage'})

  return {
    props: {
      mainAboutEntry: response.items[0].fields.mainAboutSection,
      subAboutEntries: response.items[0].fields.subAboutSections
    }
  }
}

export default function AbooutPage({ subAboutEntries, mainAboutEntry }) {
  console.log(mainAboutEntry)
  return (
    <>
    <Head>
      <title>Compound - About</title>
    </Head>
    <div className='generalWrapper'>
      <Nav />
      { documentToReactComponents(mainAboutEntry) }
      {subAboutEntries.map(subAboutEntry => (
        <AboutSubsection key={subAboutEntry.sys.id} subAboutEntry={subAboutEntry} />
      ))}
    </div>
    </>
  )
}