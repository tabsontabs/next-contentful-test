import Head from 'next/head';
import Nav from '../components/nav';
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/Careers.module.css';
import React, { Component } from 'react'
import Newfooter from '../components/newfooter';

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

  class Careers extends Component {
    constructor() {
      super();
      this.state = {
        isShow: false
      }
    }
  
    handleToggle = () => {
      const { isShow } = this.state;
      this.setState({ isShow: !isShow });
    }
  
    render() {
      const { handleToggle } = this;
      const { title, description } = this.props;
      const { isShow } = this.state;
      return (
        <>
        <div className={styles.careerEntry}>
          <h2 className={styles.positionTitle} onClick={handleToggle}>
            {title}
            <span className={isShow ? `${styles.plusHide}` : `${styles.plusShow}`} >+</span>
            <span className={isShow ? `${styles.minusShow}` : `${styles.plusHide}`}>-</span>
          </h2>
          <div className={isShow ? `jobShow ${styles.positionText}` : "jobHide"}>{description}</div>
        </div>
        </>
      );
    }
  }

  class AvailableCareers extends Component { 
    constructor() {
      const careers = careersPage.map(x => (
        x.fields.currentCareers.map(y => (
          {id: y.sys.id, title: y.fields.positionTitle, description: documentToReactComponents(y.fields.positionDescription)}
        ))
      ))
      super();
      this.state = {
        availCareers: careers
      }
    }
    
    render() {
      const careers = this.state.availCareers[0].map(x => (
        <Careers key={x.id} title={x.title} description={x.description}/>
      ));
      return <div>{careers}</div>;
    }
  }
  
  return (
    <>
    <Head>
      <title>Compound - Careers</title>
    </Head>
    <div className={styles.careersPage }>
      <div className='navWrapper'>
          <Nav />
      </div>
      <div className={`${styles.careersPageGeneralWrapper} generalWrapper`}>
        <div className={styles.careersSection}>
          <h1 className=''>Careers</h1>
          {careersPage[0].fields.currentCareers !== undefined ?
            <AvailableCareers />
          :
            careersPage.map(x => ( 
              <div key='noCareersFound' className={styles.noCareers}> { documentToReactComponents(x.fields.noCurrentCareersMessage) }</div>
            ))
          }
          
        </div>
        <Newfooter />
      </div>
    </div> 
    
    
    </>
  )
}