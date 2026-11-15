'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Sports3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent

    const container = mountRef.current;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. SPORTS ELEMENT A: 3D SOCCER GEODESIC BALL
    // ==========================================
    const soccerGroup = new THREE.Group();
    soccerGroup.position.set(4.2, 1.2, 0);

    const soccerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const soccerWireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a, // deep navy blue
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const soccerMesh = new THREE.Mesh(soccerGeo, soccerWireMat);

    // Vertices nodes
    const soccerPointsMat = new THREE.PointsMaterial({
      color: 0x2563eb,
      size: 0.08,
      transparent: true,
      opacity: 0.85
    });
    const soccerPoints = new THREE.Points(soccerGeo, soccerPointsMat);
    soccerGroup.add(soccerMesh);
    soccerGroup.add(soccerPoints);

    // Surrounding Velocity Orbit Ring
    const orbitGeo = new THREE.TorusGeometry(2.5, 0.02, 12, 64);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI * 0.4;
    orbitMesh.rotation.y = Math.PI * 0.15;
    soccerGroup.add(orbitMesh);

    scene.add(soccerGroup);

    // ==========================================
    // 2. SPORTS ELEMENT B: 3D ATHLETICS STADIUM TRACK
    // ==========================================
    const trackGroup = new THREE.Group();
    trackGroup.position.set(-0.5, 0, -3);
    trackGroup.rotation.x = Math.PI * 0.38;

    const trackLanes = 5;
    for (let i = 0; i < trackLanes; i++) {
      const radiusX = 6.2 + i * 0.55;
      const radiusY = 3.2 + i * 0.32;
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(90).map(p => new THREE.Vector3(p.x, p.y, 0));
      const laneGeo = new THREE.BufferGeometry().setFromPoints(points);
      const laneMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x1e3a8a : 0x2563eb,
        transparent: true,
        opacity: 0.22 - i * 0.03
      });
      const laneLine = new THREE.LineLoop(laneGeo, laneMat);
      trackGroup.add(laneLine);
    }
    scene.add(trackGroup);

    // ==========================================
    // 3. SPORTS ELEMENT C: 3D TENNIS SPHERE WITH SEAMS
    // ==========================================
    const tennisGroup = new THREE.Group();
    tennisGroup.position.set(-4.5, -7.5, -1);

    const tennisSphereGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const tennisSphereMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const tennisSphere = new THREE.Mesh(tennisSphereGeo, tennisSphereMat);
    tennisGroup.add(tennisSphere);

    // Sinusoidal Tennis Seam
    const seamPoints = [];
    const R = 1.52;
    for (let t = 0; t <= Math.PI * 2; t += 0.05) {
      const x = R * Math.cos(t);
      const y = R * Math.sin(t);
      const z = 0.55 * R * Math.cos(2 * t);
      const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(R);
      seamPoints.push(v);
    }
    const seamGeo = new THREE.BufferGeometry().setFromPoints(seamPoints);
    const seamLine = new THREE.LineLoop(
      seamGeo,
      new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.75 })
    );
    tennisGroup.add(seamLine);
    scene.add(tennisGroup);

    // ==========================================
    // 4. SPORTS ELEMENT D: 3D BASKETBALL CHANNELS
    // ==========================================
    const bballGroup = new THREE.Group();
    bballGroup.position.set(4.0, -15.5, -1.5);

    const bballGeo = new THREE.SphereGeometry(1.6, 20, 20);
    const bballMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    const bballMesh = new THREE.Mesh(bballGeo, bballMat);
    bballGroup.add(bballMesh);

    const ribGeo = new THREE.TorusGeometry(1.62, 0.02, 8, 48);
    const ribMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true, opacity: 0.55 });
    const rib1 = new THREE.Mesh(ribGeo, ribMat);
    const rib2 = new THREE.Mesh(ribGeo, ribMat);
    rib2.rotation.x = Math.PI / 2;
    const rib3 = new THREE.Mesh(ribGeo, ribMat);
    rib3.rotation.y = Math.PI / 2;
    bballGroup.add(rib1, rib2, rib3);
    scene.add(bballGroup);

    // ==========================================
    // 5. KINETIC ATHLETIC PARTICLES
    // ==========================================
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 28;
      particlePositions[i + 1] = (Math.random() - 0.5) * 36;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.065,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ==========================================
    // INTERPOLATION & SCROLL STATE
    // ==========================================
    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // ==========================================
    // ANIMATION LOOP (SMOOTH SCROLL GLIDE)
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerping
      const scrollLerpSpeed = prefersReducedMotion ? 0.02 : 0.06;
      currentScrollY += (targetScrollY - currentScrollY) * scrollLerpSpeed;

      // Mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const scrollFactor = currentScrollY * 0.0035;

      // Camera position driven by scroll & subtle mouse deflection
      const desiredCamX = currentMouseX * 0.6;
      const desiredCamY = -currentScrollY * 0.007 + currentMouseY * 0.4;
      const desiredCamZ = 14;

      camera.position.x += (desiredCamX - camera.position.x) * 0.08;
      camera.position.y += (desiredCamY - camera.position.y) * 0.08;
      camera.position.z += (desiredCamZ - camera.position.z) * 0.08;

      // Rotations on scroll & ambient spin
      soccerMesh.rotation.y = scrollFactor * 1.5 + (prefersReducedMotion ? 0 : elapsedTime * 0.25);
      soccerMesh.rotation.x = scrollFactor * 0.8 + (prefersReducedMotion ? 0 : elapsedTime * 0.12);
      orbitMesh.rotation.z = -scrollFactor * 2.2 + elapsedTime * 0.3;

      trackGroup.rotation.z = scrollFactor * 0.5 + elapsedTime * 0.04;
      trackGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08 + currentMouseX * 0.15;

      tennisGroup.rotation.y = scrollFactor * 2.0 + elapsedTime * 0.28;
      tennisGroup.rotation.x = Math.sin(scrollFactor) * 0.5;

      bballGroup.rotation.y = -scrollFactor * 1.8 + elapsedTime * 0.22;
      bballGroup.rotation.x = scrollFactor * 0.9;

      particleSystem.rotation.y = elapsedTime * 0.02 + scrollFactor * 0.2;
      particleSystem.rotation.x = scrollFactor * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-700"
    />
  );
}
