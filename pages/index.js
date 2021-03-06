import Head from 'next/head';
import Nav from '../components/nav';
import AboutSubsection from '../components/aboutSubsection';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Suspense } from "react";
import styles from '../styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import FrenzyDesktop from '../components/Frenzy_compress'
import FrenzyTablet from '../components/Frenzy_tablet'
import FrenzyMobile from '../components/Frenzy_mobile'
import TerminusDesktop from '../components/Terminus_compress'
import TerminusTablet from '../components/Terminus_tablet'
import TerminusMobile from '../components/Terminus_mobile'
import TerminusBigScreen from '../components/Terminus_bigscreen'
import FrenzyBigScreen from '../components/Frenzy_bigscreen'
import Newfooter from '../components/newfooter';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const response = await client.getEntries({ content_type: 'aboutPage', include: 2})
  
  return {
    props: {
      mainAboutEntry: response.items[0].fields.mainAboutSection,
      subAboutEntries: response.items[0].fields.subAboutSections
    }
  }
}

export default function HomePage({ subAboutEntries, mainAboutEntry }) {
  console.log(subAboutEntries)
  return (
    <>
    <Head>
      <title>Compound Studio</title>
      <link 
        rel='preload'
        href='public/fonts/HelveticaNeueLTPro-Roman.woff'
        as='font'
        crossOrigin=''
      ></link>
      <link rel="icon" type="image/png" href="/Compound_Favicon.png" />
    </Head>
    <div className='navWrapper'>
          <Nav />
    </div>
    <div className='canvasWrapperBigScreen'>
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
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3}/>
          <Suspense fallback={<Html><div> </div></Html>}>
            <FrenzyBigScreen />
            <TerminusBigScreen />
          </Suspense>
      </Canvas>
    </div>
    <div className='canvasWrapperDesktop'>
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
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3}/>
          <Suspense fallback={<Html><div> </div></Html>}>
            <FrenzyDesktop />
            <TerminusDesktop />
          </Suspense>
      </Canvas>
    </div>
    <div className='canvasWrapperTablet'>
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
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3}/>
          <Suspense fallback={<Html><div> </div></Html>}>
            <FrenzyTablet />
            <TerminusTablet />
          </Suspense>
      </Canvas>
    </div>
    <div className='canvasWrapperMobile'>
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
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3}/>
          <Suspense fallback={<Html><div> </div></Html>}>
            <FrenzyMobile />
            <TerminusMobile />
          </Suspense>
      </Canvas>
    </div>
    <section className={styles.main_about}>
      { documentToReactComponents(mainAboutEntry) }
    </section>
    <section className={styles.subsections}>  
    {subAboutEntries.map(subAboutEntry => (
      <div className={styles.about_subsection} id={subAboutEntry.fields.aboutSubsectionTitle}>
        <AboutSubsection key={subAboutEntry.sys.id} subAboutEntry={subAboutEntry} />
      </div>
    ))}
    </section>  
    <div className={styles.homeFooterWrapper}>
      <Newfooter />
    </div>
    </>
    
  )
}
