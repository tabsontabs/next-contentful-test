import Head from 'next/head';
import Nav from '../components/nav';
import AboutSubsection from '../components/aboutSubsection';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useRef, useState, Suspense } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE  from "three";
import styles from '../styles/Home.module.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
// import { Physics, usePlane, useBox } from "@react-three/cannon";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Riot from '../components/Riotcompressed'
import RiotTwo from '../components/Riot2'

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
  // const [vantaEffect, setVantaEffect] = useState(0);
  // const vantaRef = useRef(null);
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       NET({
  //         el: vantaRef.current,
  //         color: 0x8c8c8c,
  //         backgroundColor: 0x0,
  //         points: 10.00,
  //         maxDistance: 23.00,
  //         spacing: 20.00,
  //         THREE,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy()
  //   };
  // }, [vantaEffect]);

  return (
    <>
    <Head>
      <title>Compound Studio</title>
    </Head>
    <div className='navWrapper'>
          <Nav />
    </div>
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
          <Riot />
          <RiotTwo />
        </Suspense>
    </Canvas>
      {/* <section className={styles.vanta_about} ref={vantaRef}>] */}
      <div className={styles.main_about}>
        { documentToReactComponents(mainAboutEntry) }
      </div>
      {/* </section> */}
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

// export default function HomePage() {
  
//   return (
//     <>
//     <Head>
//       <title>Compound Studio</title>
//     </Head>
//     <div className='navWrapper'>
//       <Nav/>
//     </div>
    
//     </>
//   )
// }

