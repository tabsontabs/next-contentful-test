import Head from 'next/head';
import Nav from '../components/nav';
import Career from '../components/career';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const careerEntries = await client.getEntries({ content_type: 'career'})
  const careersPage = await client.getEntries({ content_type: 'careersPage'})

  return {
    props: {
      careerEntries: careerEntries.items,
      careersPage: careersPage.items
    }
  }
}

export default function CareersPage({ careerEntries, careersPage }) {
  // console.log(careerEntries)
  console.log(careersPage)
  return (
    <>
    <Head>
      <title>Compound - Careers</title>
    </Head>
    <Nav />
    <h1>Careers</h1>
    {careersPage[0].fields.currentCareers !== undefined ?
      careersPage.map(x => (
        x.fields.currentCareers.map(y => (
          <Career key={y.sys.id} career={y} />
        ))
      ))
    :
      careersPage.map(x => ( 
        <div> { documentToReactComponents(x.fields.noCurrentCareersMessage) }</div>
      ))
    }
    </>
  )
}