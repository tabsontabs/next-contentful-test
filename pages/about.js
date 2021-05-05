import Head from 'next/head';
import Nav from '../components/nav';
import AboutSubsection from '../components/aboutSubsection';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE  from "three";
import styles from '../styles/Home.module.css';

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
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          color: 0x8c8c8c,
          backgroundColor: 0x0,
          points: 10.00,
          maxDistance: 23.00,
          spacing: 20.00,
          THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    };
  }, [vantaEffect]);

  const [vantaEffect2, setVantaEffect2] = useState(0);
  const vantaRef2 = useRef(null);
  useEffect(() => {
    if (!vantaEffect2) {
      setVantaEffect2(
        NET({
          el: vantaRef2.current,
          color: 0x8c8c8c,
          backgroundColor: 0x0,
          points: 10.00,
          maxDistance: 23.00,
          spacing: 20.00,
          THREE,
        })
      );
    }
    return () => {
      if (vantaEffect2) vantaEffect2.destroy()
    };
  }, [vantaEffect2]);

  return (
    <>
    <Head>
      <title>Compound - About</title>
    </Head>
      <section className={styles.vanta_about} ref={vantaRef}>
        <div className='navWrapper'>
          <Nav />
        </div>
        <div className={styles.main_about}>
          { documentToReactComponents(mainAboutEntry) }
        </div>
      </section>
          
      {subAboutEntries.map(subAboutEntry => (
        <div className={styles.about_subsection} ref={vantaRef2}>
          <AboutSubsection key={subAboutEntry.sys.id} subAboutEntry={subAboutEntry} />
        </div>
      ))}
 
  
    </>
  )
}