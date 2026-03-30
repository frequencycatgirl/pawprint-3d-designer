import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraRig = ({ children }) => {
  const { camera } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      const isBreakpoint = window.innerWidth <= 1260;
      const isMobile = window.innerWidth <= 600;

      let targetPosition = [-0.4, 0, 3];
      if (isBreakpoint) targetPosition = [0, 0, 3.2];
      if (isMobile) targetPosition = [0, 0.2, 3.8];

      camera.position.set(...targetPosition);
      camera.lookAt(0, 0.1, 0);
      camera.updateProjectionMatrix();
    };

    updateCamera();
    window.addEventListener('resize', updateCamera);
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera]);

  return <>{children}</>;
};

export default CameraRig;
