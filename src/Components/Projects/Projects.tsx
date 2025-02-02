import { useEffect, useRef, FC } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { projects } from '../../assets/projectsVariable/projects';
import s from './Projects.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Projects: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.current?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const textureCache = new Map<string, THREE.Texture>();

    const loadTexture = (path: string) => {
      if (!textureCache.has(path)) {
        textureCache.set(path, textureLoader.load(path));
      }
      return textureCache.get(path)!;
    };

    const geometry = new THREE.BoxGeometry(3, 2, 0.3);
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

    const createMesh = (x: number, y: number, z: number, rotationY: number, texturePath: string) => {
      const textureMaterial = new THREE.MeshBasicMaterial({ map: loadTexture(texturePath) });
      const material = [basicMaterial, basicMaterial, basicMaterial, basicMaterial, textureMaterial, basicMaterial];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.rotation.y = rotationY;
      return mesh;
    };

    const modelsGroup = new THREE.Group();
    const meshes = [
      createMesh(0, 0, 0, 0, 'src/assets/images/portfolioPrev.png'),
      createMesh(-3, -3, -5, 0.5, 'src/assets/images/storePrev.png'),
      createMesh(6, -6, -10, -0.5, 'src/assets/images/portfolioPrev.png'),
      createMesh(-13, -9, -13, 0.8, 'src/assets/images/storePrev.png')
    ];
    modelsGroup.add(...meshes);
    scene.add(modelsGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableRotate = true;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          snap: { snapTo: [0, 0.33, 0.66, 1], delay: 0.001, ease: 'power1.out', duration: 1 },
          end: '+=5000',
        }
      })
        .to(camera.position, { z: 0, x: -3, y: -3, ease: 'power1.inOut' })
        .to(camera.rotation, { y: 0.5 }, '<')
        .to(project1Ref.current, { xPercent: 150, yPercent: -50 }, '<')

        .to(camera.position, { z: -5, x: 6, y: -6, ease: 'power1.inOut' })
        .to(camera.rotation, { y: -0.5 }, '<')
        .to(project1Ref.current, { xPercent: -150, yPercent: -50 }, '<')
        .to(project2Ref.current, { xPercent: -300, yPercent: -50 }, '<')

        .to(camera.position, { z: -10, x: -9, y: -9, ease: 'power1.inOut' })
        .to(camera.rotation, { y: 0.5 }, '<')
        .to(project2Ref.current, { xPercent: 300, yPercent: -50 }, '<')
        .to(project3Ref.current, { xPercent: -300, yPercent: -50 }, '<');
    }, container);

    
    const animate = () => {
      if (!animationRef.current) return;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      renderer.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div ref={container} id="projects" className='container'>
      <div className={s.project1} ref={project1Ref}>
        <h1>{projects[0].name}</h1>
        <p>{projects[0].description}</p>
      </div>
      <div className={s.project2} ref={project2Ref}>
        <h1>{projects[1].name}</h1>
        <p>{projects[1].description}</p>
      </div>
      <div className={s.project3} ref={project3Ref}>
        <h1>{projects[2].name}</h1>
        <p>{projects[2].description}</p>
      </div>
    </div>
  );
};

export default Projects;
