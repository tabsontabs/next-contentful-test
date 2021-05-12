/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Riot(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/riotcompressed.glb')
  // const mesh = useRef(null);
  useFrame(() => (group.current.rotation.x = group.current.rotation.y += 0.01)) 
  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, -300]}>
          <mesh geometry={nodes.object_1.geometry} material={nodes.object_1.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_2.geometry} material={nodes.object_2.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_3.geometry} material={nodes.object_3.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_4.geometry} material={nodes.object_4.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_5.geometry} material={nodes.object_5.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_6.geometry} material={nodes.object_6.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_7.geometry} material={nodes.object_7.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_8.geometry} material={nodes.object_8.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_9.geometry} material={nodes.object_9.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_10.geometry} material={nodes.object_10.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_11.geometry} material={nodes.object_11.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_12.geometry} material={nodes.object_12.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_13.geometry} material={nodes.object_13.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_14.geometry} material={nodes.object_14.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_15.geometry} material={nodes.object_15.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_16.geometry} material={nodes.object_16.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_17.geometry} material={nodes.object_17.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_18.geometry} material={nodes.object_18.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_19.geometry} material={nodes.object_19.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_20.geometry} material={nodes.object_20.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_21.geometry} material={nodes.object_21.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_22.geometry} material={nodes.object_22.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_23.geometry} material={nodes.object_23.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_24.geometry} material={nodes.object_24.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_25.geometry} material={nodes.object_25.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_26.geometry} material={nodes.object_26.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_27.geometry} material={nodes.object_27.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_28.geometry} material={nodes.object_28.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_29.geometry} material={nodes.object_29.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_30.geometry} material={nodes.object_30.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_31.geometry} material={nodes.object_31.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_32.geometry} material={nodes.object_32.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_33.geometry} material={nodes.object_33.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_34.geometry} material={nodes.object_34.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_35.geometry} material={nodes.object_35.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_36.geometry} material={nodes.object_36.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_37.geometry} material={nodes.object_37.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_38.geometry} material={nodes.object_38.material} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.object_39.geometry} material={nodes.object_39.material} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/riotcompressed.glb')