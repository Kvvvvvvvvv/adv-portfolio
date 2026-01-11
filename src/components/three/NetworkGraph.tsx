import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useMotion } from '@/contexts/MotionContext';

// Generate network nodes
const generateNodes = (count: number) => {
  const nodes: { position: [number, number, number]; type: 'primary' | 'secondary' | 'threat' | 'safe' }[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3 + Math.random() * 4;
    
    nodes.push({
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ],
      type: Math.random() > 0.85 ? 'threat' : Math.random() > 0.5 ? 'primary' : Math.random() > 0.3 ? 'secondary' : 'safe',
    });
  }
  return nodes;
};

// Generate connections between nearby nodes
const generateEdges = (nodes: { position: [number, number, number] }[]) => {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.sqrt(
        Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
        Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
        Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
      );
      if (dist < 3 && Math.random() > 0.6) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
};

// Node component
const Node: React.FC<{
  position: [number, number, number];
  type: 'primary' | 'secondary' | 'threat' | 'safe';
  reduceMotion: boolean;
}> = ({ position, type, reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const color = useMemo(() => {
    switch (type) {
      case 'primary': return '#00d4ff';
      case 'secondary': return '#4a7dbd';
      case 'threat': return '#e05050';
      case 'safe': return '#4ade80';
      default: return '#00d4ff';
    }
  }, [type]);

  const scale = type === 'threat' ? 0.12 : type === 'primary' ? 0.1 : 0.07;

  useFrame(({ clock }) => {
    if (meshRef.current && !reduceMotion) {
      const pulse = Math.sin(clock.elapsedTime * 2 + position[0]) * 0.02;
      meshRef.current.scale.setScalar(scale + pulse);
    }
    if (glowRef.current && !reduceMotion) {
      const glowPulse = Math.sin(clock.elapsedTime * 1.5 + position[1]) * 0.1 + 0.4;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowPulse;
    }
  });

  const nodeContent = (
    <group position={position}>
      {/* Core node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={2.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );

  if (reduceMotion) {
    return nodeContent;
  }

  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
      {nodeContent}
    </Float>
  );
};

// Edge component
const Edge: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  reduceMotion: boolean;
}> = ({ start, end }) => {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#3a5a7a', transparent: true, opacity: 0.2 }))} />
  );
};

// Data packet traveling along edge
const DataPacket: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  delay: number;
  reduceMotion: boolean;
}> = ({ start, end, speed, delay, reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current && !reduceMotion) {
      const t = ((clock.elapsedTime * speed + delay) % 1);
      meshRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      meshRef.current.scale.setScalar(0.03 * (1 - Math.abs(t - 0.5) * 0.5));
    }
  });

  if (reduceMotion) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
    </mesh>
  );
};

// Camera controller with scroll
const CameraController: React.FC<{ scrollProgress: number; reduceMotion: boolean }> = ({ 
  scrollProgress, 
  reduceMotion 
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 12));

  useFrame(() => {
    if (reduceMotion) {
      camera.position.set(0, 0, 12);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Smooth camera movement based on scroll
    const targetY = -scrollProgress * 3;
    const targetZ = 12 - scrollProgress * 2;
    const targetX = Math.sin(scrollProgress * Math.PI * 0.5) * 2;

    targetPosition.current.set(targetX, targetY, targetZ);
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, targetY * 0.5, 0);
  });

  return null;
};

// Mouse follow effect
const MouseFollow: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y += (mouse.current.x * 0.1 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (mouse.current.y * 0.1 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return <group ref={groupRef} />;
};

// Main scene
const Scene: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const { reduceMotion } = useMotion();
  const groupRef = useRef<THREE.Group>(null);
  
  const { nodes, edges } = useMemo(() => {
    const nodes = generateNodes(40);
    const edges = generateEdges(nodes);
    return { nodes, edges };
  }, []);

  // Select some edges for data packets
  const packetEdges = useMemo(() => {
    return edges.filter(() => Math.random() > 0.7);
  }, [edges]);

  useFrame(() => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      <CameraController scrollProgress={scrollProgress} reduceMotion={reduceMotion} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#e05050" />
      
      <group ref={groupRef}>
        {/* Render edges */}
        {edges.map(([i, j], idx) => (
          <Edge
            key={`edge-${idx}`}
            start={nodes[i].position}
            end={nodes[j].position}
            reduceMotion={reduceMotion}
          />
        ))}
        
        {/* Render nodes */}
        {nodes.map((node, idx) => (
          <Node
            key={`node-${idx}`}
            position={node.position}
            type={node.type}
            reduceMotion={reduceMotion}
          />
        ))}
        
        {/* Data packets */}
        {packetEdges.map(([i, j], idx) => (
          <DataPacket
            key={`packet-${idx}`}
            start={nodes[i].position}
            end={nodes[j].position}
            speed={0.2 + Math.random() * 0.3}
            delay={Math.random()}
            reduceMotion={reduceMotion}
          />
        ))}
      </group>
    </>
  );
};

// Exported component
interface NetworkGraphProps {
  scrollProgress: number;
  className?: string;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ scrollProgress, className }) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default NetworkGraph;
