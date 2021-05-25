import Head from 'next/head';
import Nav from '../components/nav';
import AboutSubsection from '../components/aboutSubsection';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Suspense } from "react";
import styles from '../styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import RiotTwo from '../components/Riot2'
import Frenzy from '../components/Frenzy'
import RiotCompress from '../components/Riot_u_compress'

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

export default function HomePage({ subAboutEntries, mainAboutEntry }) {

  return (
    <>
    <Head>
      <title>Compound Studio</title>
    </Head>
    <div className='navWrapper'>
          <Nav />
    </div>
    <div className='canvasWrapper'>
      <Canvas>
          <OrbitControls 
            autoRotate
            autoRotateSpeed={1.0}
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            maxAzimuthAngle={0}
            minAzimuthAngle={0}
          />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3}/>
          <Suspense fallback={<Html><div> </div></Html>}>
            {/* <Riot /> */}
            {/* <RiotTwo /> */}
            {/* <Frenzy /> */}
            < RiotCompress />
          </Suspense>
      </Canvas>
    </div>
      <div className={styles.main_about}>
        { documentToReactComponents(mainAboutEntry) }
      </div>
      <section className={styles.subsections}>  
      {subAboutEntries.map(subAboutEntry => (
        <div className={styles.about_subsection}>
          <AboutSubsection key={subAboutEntry.sys.id} subAboutEntry={subAboutEntry} />
        </div>
      ))}
      </section>  
      
    </>
  )
}
