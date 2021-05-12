import '../styles/globals.css'
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='hotpink' />
    </mesh>
  )
}
function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const threeScript = document.createElement("script");
  //   threeScript.setAttribute("id", "threeScript");
  //   threeScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
  //   document.getElementsByTagName("head")[0].appendChild(threeScript);
  //   return () => {
  //     if (threeScript) {
  //       threeScript.remove();
  //     }
  //   };
  // }, []);
  return <Component {...pageProps} /> 
  // <Canvas>
  //     <OrbitControls />
  //     <Stars />
  //     <ambientLight intensity={0.5} />
  //     <spotLight 
  //       position={[10, 15, 10]} angle={0.3}
  //     />
  //     <Box />
  // </Canvas>
  
}

export default MyApp
