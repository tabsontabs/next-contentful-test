import Head from 'next/head'
import Nav from '../components/nav'
import Tilt from 'react-tilt'

function HomePage() {
  return (
    <>
      <Head>
        <title>Compound Studios</title>
      </Head>
      <div className="navWrapper"> 
        <Nav></Nav>
      </div>
      <div className="tiltContainer">
        <Tilt className="Tilt" options={{ max : 50, perspective: 1000, easing: "cubic-bezier(.03,.98,.52,.99)", transition: true }}  >
          <div>
            <svg className='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 539 56.38"><title>Compound Studio</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon className="cls-1" points="0 44.3 56.38 44.3 56.38 36.24 8.05 36.24 8.05 20.13 56.38 20.13 56.38 12.08 0 12.08 0 44.3"/><polygon className="cls-1" points="133.81 17.62 133.81 20.13 133.81 44.3 141.86 44.3 141.86 20.13 165.17 20 165.17 44.16 173.22 44.16 173.22 20 196.53 20.13 196.53 44.3 204.59 44.3 204.59 12.08 133.81 12.08 133.81 17.62"/><polygon className="cls-1" points="397.25 36.24 356.98 36.24 356.98 12.08 348.93 12.08 348.93 44.3 397.25 44.3 399.87 44.3 405.3 44.3 405.3 12.08 397.25 12.08 397.25 36.24"/><polygon className="cls-1" points="415.83 17.89 415.83 20.13 415.83 44.3 423.88 44.3 423.88 20.13 464.15 20.13 464.15 44.3 472.21 44.3 472.21 12.08 415.83 12.08 415.83 17.89"/><path className="cls-1" d="M531,0V12.08H482.62V44.3H539V0Zm0,23.35V36.24H490.68V20.13H531Z"/><path className="cls-1" d="M215.12,12.08v44.3h8V44.3h48.32V12.08H215.12Zm48.32,8V36.24H223.17V20.13Z"/><path className="cls-1" d="M66.9,36.24V44.3h56.38V12.08H66.9Zm8.06,0V20.13h40.27V36.24Z"/><path className="cls-1" d="M282.54,36.24V44.3h56.37V12.08H282.54Zm8,0V20.13h40.27V36.24Z"/></g></g></svg>
          </div>
        </Tilt>
      </div>
      
      <style jsx>{`
        .navWrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: 80%;
        }
        .tiltContainer {
          max-width: 1400px;
          margin: 0 auto;
        }
        `}</style>
    </>
  )
}

export default HomePage