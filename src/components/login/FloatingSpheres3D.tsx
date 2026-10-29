"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingSpheres3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a2a20, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x34d399, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.0, 15);
    cyanLight.position.set(-4, -2, 4);
    scene.add(cyanLight);

    // Create 3D Luminous Emerald Spheres (Reference Image 3 matching)
    const sphereGroup = new THREE.Group();
    const sphereData = [
      { radius: 1.4, x: -3.2, y: 1.8, z: -1, color: 0x10b981, speed: 0.8 },
      { radius: 2.1, x: -2.8, y: -2.2, z: 0.5, color: 0x059669, speed: 0.6 },
      { radius: 1.1, x: 0.2, y: 3.2, z: -2, color: 0x34d399, speed: 1.0 },
      { radius: 1.8, x: 2.6, y: 1.5, z: -1.5, color: 0x10b981, speed: 0.7 },
      { radius: 0.9, x: 1.5, y: -3.2, z: 1, color: 0x2dd4bf, speed: 1.2 },
      { radius: 0.6, x: 3.8, y: -1.8, z: -2, color: 0x6ee7b7, speed: 0.9 },
    ];

    const meshes: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; phase: number }[] = [];

    sphereData.forEach((item, index) => {
      const geo = new THREE.SphereGeometry(item.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: item.color,
        roughness: 0.25,
        metalness: 0.1,
        emissive: item.color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(item.x, item.y, item.z);
      sphereGroup.add(mesh);
      meshes.push({
        mesh,
        basePos: mesh.position.clone(),
        speed: item.speed,
        phase: index * 1.2,
      });
    });

    scene.add(sphereGroup);

    // Subtle Spore Particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa7f3d0,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const pMesh = new THREE.Points(pGeo, pMat);
    scene.add(pMesh);

    let animationId: number;
    let clock = new THREE.Clock();

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      meshes.forEach(({ mesh, basePos, speed, phase }) => {
        mesh.position.y = basePos.y + Math.sin(time * speed + phase) * 0.35;
        mesh.position.x = basePos.x + Math.cos(time * speed * 0.7 + phase) * 0.2;
      });

      // Mouse subtle camera tilt
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#030c0a]/50 to-[#030c0a]/90 pointer-events-none" />
    </div>
  );
}
