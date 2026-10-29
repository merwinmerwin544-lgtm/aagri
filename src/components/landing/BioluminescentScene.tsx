"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BioluminescentScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not available, falling back to CSS background", e);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030d0a, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 9);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Ambient & Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x0a261f, 1.8);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    moonLight.position.set(-5, 10, 5);
    scene.add(moonLight);

    // Glowing Tree Center Point Light
    const treeCoreLight = new THREE.PointLight(0xa7f3d0, 4.0, 16);
    treeCoreLight.position.set(0, 3.8, 0);
    scene.add(treeCoreLight);

    const biolumPurpleLight = new THREE.PointLight(0xe879f9, 2.5, 12);
    biolumPurpleLight.position.set(0, 4.5, 1);
    scene.add(biolumPurpleLight);

    // ==========================================
    // 1. Central Luminous Tree Structure (Avatar Willow)
    // ==========================================
    const treeGroup = new THREE.Group();

    // Trunk & Main Branches
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.5, 0),
      new THREE.Vector3(0.1, 0.8, -0.1),
      new THREE.Vector3(-0.2, 2.2, 0.1),
      new THREE.Vector3(0, 3.4, 0),
    ]);
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 24, 0.45, 10, false);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x051d16,
      roughness: 0.8,
      metalness: 0.2,
      emissive: 0x064e3b,
      emissiveIntensity: 0.35,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    treeGroup.add(trunk);

    // Branch arcs
    const branchPoints = [
      [new THREE.Vector3(0, 3.2, 0), new THREE.Vector3(-1.8, 4.2, 0.5), new THREE.Vector3(-3.2, 4.5, 0.8)],
      [new THREE.Vector3(0, 3.2, 0), new THREE.Vector3(1.8, 4.2, -0.4), new THREE.Vector3(3.2, 4.6, -0.6)],
      [new THREE.Vector3(0, 3.0, 0), new THREE.Vector3(-1.2, 4.0, -1.5), new THREE.Vector3(-2.4, 4.4, -2.5)],
      [new THREE.Vector3(0, 3.0, 0), new THREE.Vector3(1.4, 4.1, 1.4), new THREE.Vector3(2.8, 4.5, 2.2)],
      [new THREE.Vector3(0, 3.4, 0), new THREE.Vector3(0, 4.8, 0.5), new THREE.Vector3(0.2, 5.5, 0)],
    ];

    branchPoints.forEach((pts) => {
      const bCurve = new THREE.CatmullRomCurve3(pts);
      const bGeo = new THREE.TubeGeometry(bCurve, 16, 0.2, 8, false);
      const bMesh = new THREE.Mesh(bGeo, trunkMat);
      treeGroup.add(bMesh);
    });

    // Hanging Bioluminescent Tendrils (Avatar-style glowing drooping strands)
    const tendrilCount = 75;
    const tendrilGroup = new THREE.Group();
    const tendrilMaterials = [
      new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.85 }),
      new THREE.LineBasicMaterial({ color: 0xa7f3d0, transparent: true, opacity: 0.9 }),
      new THREE.LineBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.75 }),
      new THREE.LineBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.8 }),
    ];

    for (let i = 0; i < tendrilCount; i++) {
      const angle = (i / tendrilCount) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 1.0 + Math.random() * 2.6;
      const startX = Math.cos(angle) * radius;
      const startZ = Math.sin(angle) * radius;
      const startY = 3.8 + Math.random() * 1.5;
      const length = 2.2 + Math.random() * 2.8;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(startX * 1.08, startY - length * 0.4, startZ * 1.08),
        new THREE.Vector3(startX * 1.02 + Math.sin(i) * 0.2, startY - length * 0.75, startZ * 1.02),
        new THREE.Vector3(startX * 0.95, startY - length, startZ * 0.95),
      ]);

      const points = curve.getPoints(14);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = tendrilMaterials[i % tendrilMaterials.length];
      const line = new THREE.Line(geo, mat);
      tendrilGroup.add(line);
    }
    treeGroup.add(tendrilGroup);

    // ==========================================
    // 2. Bioluminescent Canopy Particles (Glowing Blossoms)
    // ==========================================
    const canopyCount = 900;
    const canopyGeo = new THREE.BufferGeometry();
    const canopyPositions = new Float32Array(canopyCount * 3);
    const canopyColors = new Float32Array(canopyCount * 3);

    for (let i = 0; i < canopyCount; i++) {
      const rad = 0.8 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      canopyPositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      canopyPositions[i * 3 + 1] = 4.2 + (Math.random() - 0.3) * 2.2;
      canopyPositions[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      // Gradient colors: mint to cyan to soft magenta
      const pick = Math.random();
      if (pick < 0.45) {
        // Mint / Emerald
        canopyColors[i * 3] = 0.2;
        canopyColors[i * 3 + 1] = 0.95;
        canopyColors[i * 3 + 2] = 0.75;
      } else if (pick < 0.8) {
        // Cyan / Blue
        canopyColors[i * 3] = 0.35;
        canopyColors[i * 3 + 1] = 0.85;
        canopyColors[i * 3 + 2] = 1.0;
      } else {
        // Biolum Magenta
        canopyColors[i * 3] = 0.95;
        canopyColors[i * 3 + 1] = 0.45;
        canopyColors[i * 3 + 2] = 0.9;
      }
    }

    canopyGeo.setAttribute("position", new THREE.BufferAttribute(canopyPositions, 3));
    canopyGeo.setAttribute("color", new THREE.BufferAttribute(canopyColors, 3));

    const canopyMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const canopyPoints = new THREE.Points(canopyGeo, canopyMat);
    treeGroup.add(canopyPoints);

    // ==========================================
    // 3. Floating Bioluminescent Spores / Fireflies
    // ==========================================
    const sporeCount = 450;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    const sporeVelocities: { y: number; drift: number }[] = [];

    for (let i = 0; i < sporeCount; i++) {
      sporePositions[i * 3] = (Math.random() - 0.5) * 16;
      sporePositions[i * 3 + 1] = -1.0 + Math.random() * 8.0;
      sporePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      sporeVelocities.push({
        y: 0.005 + Math.random() * 0.012,
        drift: (Math.random() - 0.5) * 0.006,
      });
    }

    sporeGeo.setAttribute("position", new THREE.BufferAttribute(sporePositions, 3));
    const sporeMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sporePoints = new THREE.Points(sporeGeo, sporeMat);
    scene.add(sporePoints);

    // ==========================================
    // 4. Undulating Agricultural Field Plane
    // ==========================================
    const terrainGeo = new THREE.PlaneGeometry(30, 30, 48, 48);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const elevation = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.4 - 1.2;
      posAttr.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x031710,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: false,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrain);

    // Holographic crop grid overlay
    const gridWireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const gridWire = new THREE.Mesh(terrainGeo, gridWireMat);
    gridWire.position.y += 0.02;
    scene.add(gridWire);

    scene.add(treeGroup);

    // ==========================================
    // Animation & Mouse Parallax
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 2.5;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 1.5;
      targetCameraY = 2.5 - mouseY * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera smooth damping
      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.lookAt(0, 2.8, 0);

      // Subtle slow tree rotation
      treeGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.08;

      // Tendrils swaying gently like bioluminescent willow tendrils in breeze
      tendrilGroup.children.forEach((child, idx) => {
        child.rotation.z = Math.sin(elapsedTime * 1.2 + idx * 0.2) * 0.04;
        child.rotation.x = Math.cos(elapsedTime * 0.9 + idx * 0.15) * 0.03;
      });

      // Luminous spore ascension
      const pos = sporeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < sporeCount; i++) {
        pos[i * 3 + 1] += sporeVelocities[i].y;
        pos[i * 3] += Math.sin(elapsedTime + i) * 0.003;

        // Reset if drifted too high
        if (pos[i * 3 + 1] > 7.5) {
          pos[i * 3 + 1] = -1.2;
          pos[i * 3] = (Math.random() - 0.5) * 16;
        }
      }
      sporeGeo.attributes.position.needsUpdate = true;

      // Pulsing tree light glow
      treeCoreLight.intensity = 3.6 + Math.sin(elapsedTime * 2.0) * 0.8;
      biolumPurpleLight.intensity = 2.2 + Math.cos(elapsedTime * 1.8) * 0.6;

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
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Atmospheric bioluminescent backdrop gradients (Avatar Reference Image 1 matching) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 35%, rgba(56, 189, 248, 0.15) 0%, rgba(16, 185, 129, 0.08) 35%, transparent 70%),
            radial-gradient(circle at 30% 65%, rgba(192, 132, 252, 0.12) 0%, transparent 45%),
            linear-gradient(to bottom, rgba(3, 12, 10, 0.2) 0%, rgba(3, 12, 10, 0.4) 75%, #030c0a 100%)
          `,
        }}
      />

      {/* Soft ethereal light beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-cyan-400/10 via-emerald-400/5 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />
    </div>
  );
}
