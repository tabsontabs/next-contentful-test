import Head from 'next/head';
import Nav from '../components/nav';
import Career from '../components/career';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/Careers.module.css';
import React, { useState, Component } from 'react'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  const careersPage = await client.getEntries({ content_type: 'careersPage'})



  return {
    props: {
      careersPage: careersPage.items 
    }
  }
}

export default function CareersPage({ careersPage }) {
  
  const [show, setShow] = useState(false)

  const [test, setTest] = useState('')

  const handleClick = (e) => {
    setTest(e.target.id)
  }

  const [state, setState] = useState(["a", "b", "c"]);
  console.log(state)

  const [state2, setState2] = useState([{id: 1, b: 2}, {id: 3, b: 4}, {id: 5, b: 6}, ])
  console.log(state2)

  
  return (
    <>
    <Head>
      <title>Compound - Careers</title>
    </Head>
    <div className={styles.careersPage }>
      <div className='navWrapper'>
          <Nav />
      </div>
      <div className='generalWrapper'>
        <div className={styles.careersSection}>
          <h1 className=''>Careers</h1>
          {careersPage[0].fields.currentCareers !== undefined ?
            careersPage.map(x => (
              x.fields.currentCareers.map(y => (
                <div key={y.sys.id} className={styles.careerEntry}>
                  <h2 id={y.sys.id} className={styles.positionTitle}
                      onClick={handleClick}
                      >
                      { y.fields.positionTitle } 
                      <span className={styles.collapsiblePlus}>+</span>
                  </h2>
                  <div className={styles.positionText} 
                  style={{display: show == y.sys.id ? 'none': 'block'}}
                  >
                      { documentToReactComponents(y.fields.positionDescription) }
                  </div>
                </div>
              ))
            ))
          :
            careersPage.map(x => ( 
              <div key='noCareersFound'> { documentToReactComponents(x.fields.noCurrentCareersMessage) }</div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}