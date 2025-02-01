
import { useEffect, useRef, FC } from 'react'
import s from './Projects.module.scss'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { projects } from '../../assets/projectsVariable/projects'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

const Projects:FC = () => {

  const container = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);


  useEffect(() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Texture() // scene.background = new THREE.Color(0xd9d9d9);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0,0,5)

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.current && container.current.appendChild(renderer.domElement)

    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(1,1,1)
    scene.add(light1)






    const geometry = new THREE.BoxGeometry(3,2,0.3)
    const basicMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc})

    const createMesh = (x: number, y: number, z: number, rotationY: number, texturePath: string) => {

    const texture = new THREE.TextureLoader().load(texturePath)
    const textureMaterial = new THREE.MeshBasicMaterial({map: texture})

    const material = [
      basicMaterial,
      basicMaterial,
      basicMaterial,
      basicMaterial,
      textureMaterial,
      basicMaterial,
    ]
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x,y,z)
        mesh.rotation.y = rotationY
        return mesh
    }

    const mesh = createMesh(0,0,0,0, 'src/assets/images/portfolioPrev.png');
    scene.add(mesh)  

    const mesh1 = createMesh(-3, -3, -5, 0.5, 'src/assets/images/storePrev.png');
    scene.add(mesh1)    

    const mesh2 = createMesh(6, -6, -10, -0.5, 'src/assets/images/portfolioPrev.png');
    scene.add(mesh2)

    const mesh3 = createMesh(-13, -9, -13, 0.8, 'src/assets/images/storePrev.png');
    scene.add(mesh3)





    

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enableRotate = true

    const ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          snap: {snapTo: [0, 0.33, 0.66, 1], delay: 0.001, ease: 'power1.out', duration: 1},
          end: '+=5000'
        }
      })
      
      .to(camera.position, {z: 0, x: -3, y: -3, ease: 'power1.inOut'})
      .to(camera.rotation, {y: 0.5}, '<')
      .to(project1Ref.current, {xPercent: 150, yPercent: -50}, '<')
      
      .to(camera.position, {z: -5, x: 6, y: -6, ease: 'power1.inOut'})
      .to(camera.rotation, {y: -0.5}, '<')
      .to(project1Ref.current, {xPercent: -150, yPercent: -50}, '<')
      .to(project2Ref.current, {xPercent: -300, yPercent: -50}, '<')

      .to(camera.position, {z: -10, x: -9, y: -9, ease: 'power1.inOut'})
      .to(camera.rotation, {y: 0.5}, '<')
      .to(project2Ref.current, {xPercent: 300, yPercent: -50}, '<')
      .to(project3Ref.current, {xPercent: -300, yPercent: -50}, '<')

    }, container)

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
        ctx.revert()
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  }, [])

  
  return (
    <div ref={container} id='projects' className='container'>
      <div className={s.project1} ref={project1Ref}>
        <h1>{projects[0].name}</h1>
          <p>
            {projects[0].description}
          </p>
      </div>
      <div className={s.project2} ref={project2Ref}>
      <h1>{projects[1].name}</h1>
          <p>
            {projects[1].description}
          </p>
      </div>
      <div className={s.project3} ref={project3Ref}>
      <h1>{projects[2].name}</h1>
          <p>
            {projects[2].description}
          </p>
      </div>
    </div>
  )
}

export default Projects