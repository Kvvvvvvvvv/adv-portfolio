import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';

interface WebGLSafeWrapperProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  canvasProps?: any;
}

const WebGLSafeWrapper: React.FC<WebGLSafeWrapperProps> = ({
  children,
  className = '',
  fallback = null,
  canvasProps = {}
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [hasErrored, setHasErrored] = useState(false);

  const checkWebGLSupport = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        // Check for WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.warn('WebGL is not supported on this device');
          resolve(false);
          return;
        }

        // Perform a simple WebGL operation to verify it works
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (ext) {
          const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          console.log('WebGL Renderer:', renderer);
        }

        resolve(true);
      } catch (error) {
        console.error('WebGL check failed:', error);
        resolve(false);
      }
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const initializeWebGL = async () => {
      try {
        const isSupported = await checkWebGLSupport();
        if (!isCancelled) {
          setWebglSupported(isSupported);
        }
      } catch (error) {
        console.error('Error initializing WebGL:', error);
        if (!isCancelled) {
          setWebglSupported(false);
        }
      }
    };

    initializeWebGL();

    return () => {
      isCancelled = true;
    };
  }, [checkWebGLSupport]);

  const handleCanvasError = (error: ErrorEvent) => {
    console.error('WebGL Canvas Error:', error);
    setHasErrored(true);
    setWebglSupported(false);
  };

  if (webglSupported === null || hasErrored) {
    // Show fallback while checking or if there was an error
    return <>{fallback}</>;
  }

  if (!webglSupported) {
    // WebGL not supported, show fallback
    return <>{fallback}</>;
  }

  // WebGL is supported, render the canvas with error handling
  return (
    <div className={className}>
      <Canvas
        {...canvasProps}
        onCreated={({ gl }) => {
          // Add event listener for context loss
          gl.canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL context lost, attempting recovery...');
            setHasErrored(true);
          });

          gl.canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
            setHasErrored(false);
          });

          // Limit pixel ratio based on device capability
          const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
          gl.setPixelRatio(pixelRatio);
          
          // Set performance settings
          gl.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
        }}
        onError={handleCanvasError}
      >
        {children}
      </Canvas>
    </div>
  );
};

export default WebGLSafeWrapper;