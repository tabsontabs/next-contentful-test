import Head from 'next/head';
import Nav from '../components/nav';
import Suspense from 'react';
// import AboutSubsection from '../components/aboutSubsection';
// import { createClient } from 'contentful'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useRef, useState } from "react";
// import NET from "vanta/dist/vanta.net.min";
// import * as THREE  from "three";
// import styles from '../styles/Home.module.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, usePlane, useBox } from "@react-three/cannon";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Riot from '../components/Riotcompressed'
import RiotTwo from '../components/Riot2'

// export async function getStaticProps() {

//   const client = createClient({
//     space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//     accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
//   })

//   const response = await client.getEntries({ content_type: 'aboutPage'})

//   return {
//     props: {
//       mainAboutEntry: response.items[0].fields.mainAboutSection,
//       subAboutEntries: response.items[0].fields.subAboutSections
//     }
//   }
// }

// export default function HomePage({ subAboutEntries, mainAboutEntry }) {
//   const [vantaEffect, setVantaEffect] = useState(0);
//   const vantaRef = useRef(null);
//   useEffect(() => {
//     if (!vantaEffect) {
//       setVantaEffect(
//         NET({
//           el: vantaRef.current,
//           color: 0x8c8c8c,
//           backgroundColor: 0x0,
//           points: 10.00,
//           maxDistance: 23.00,
//           spacing: 20.00,
//           THREE,
//         })
//       );
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy()
//     };
//   }, [vantaEffect]);

//   return (
//     <>
//     <Head>
//       <title>Compound Studio</title>
//     </Head>
//       <section className={styles.vanta_about} ref={vantaRef}>
//       <div className={styles.overlay}>  
//         <div className='navWrapper'>
//           <Nav />
//         </div>
//         <div className={styles.main_about}>
//           { documentToReactComponents(mainAboutEntry) }
//         </div>
//       </div>
//       </section>
//       <section className={styles.subsections}>  
//       {subAboutEntries.map(subAboutEntry => (
//         <div className={styles.about_subsection}>
//           <AboutSubsection key={subAboutEntry.sys.id} subAboutEntry={subAboutEntry} />
//         </div>
//       ))}
//       </section>  
//     </>
//   )
// }

// function Box() {
//   const [ref] = useBox(() => ({ mass: 1, position: [0, 2, 0] }))
//   return (
//     <mesh ref={ref} position={[0, 2, 0]}>
//       <boxBufferGeometry attach='geometry' />
//       <meshLambertMaterial attach='material' color='hotpink' />
//     </mesh>
//   )
// }

// function Plane() {
//   const [ref, api] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
//   return(
//     <mesh onClick={() => {
//       api.velocity.set(0, 2, 0)
//     }} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeBufferGeometry attach='geometry' args={[100, 100]} />
//       <meshLambertMaterial attach='material' color='lightblue' />
//     </mesh>
//   )
// }



export default function HomePage() {
  
  return (
    <>
    <Head>
      <title>Compound Studio</title>
    </Head>
    <div class='navWrapper'>
      <Nav/>
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
      {/* <Suspense fallback={null}> */}
      <Riot />
      <RiotTwo />
      {/* </Suspense> */}
    </Canvas>
    </>
  )
}

