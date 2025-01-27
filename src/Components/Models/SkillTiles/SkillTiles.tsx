import {useRef, useEffect, FC} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import s from './SkillTiles.module.scss'
import { generateModels } from '../../../utils/generateModels';
import debounce from '../../../utils/debounce';
import { techSkills } from '../../../assets/skillsVariable/techSkills';

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Tile:FC = () => {

    const refElement = useRef<HTMLDivElement>(null)

    const geometryGroup = generateModels(techSkills)

    useGSAP(() => {
        geometryGroup.children.map((el) => {
            gsap.from(el.rotation, {
                scrollTrigger: {
                    trigger: `.${s.container}`,
                    scrub: 1,
                    end: '40% 60%',
                    // markers: true
                },
                x: 3,
                y: 3,
            }),
            console.log(`.${s.container}`)
            gsap.from(el.position, {
                scrollTrigger: {
                    trigger: `.${s.container}`,
                    scrub: 1,
                    end: '40% 60%',
                    // markers: true
                },
                x: 0,
                y: 0,
            })
        })
    }, {scope: refElement})

useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Texture()

// Perspective Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50); // Move the camera far away
camera.zoom = 15; // High zoom to reduce perspective distortion
camera.updateProjectionMatrix(); // Apply zoom changes

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(refElement.current!.offsetWidth, refElement.current!.offsetHeight); //refElement.current!.offsetWidth, refElement.current!.offsetHeight
refElement.current && refElement.current.appendChild(renderer.domElement);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light1);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0,-4,7.5);
scene.add(light);

// geometryGroup.position.setX(-geometryGroup.children.length/1.4 + 0.8)
geometryGroup.position.setY(0.8)
scene.add(geometryGroup)


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('mousemove', (event) => {
    const boundingRect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - boundingRect.left) / boundingRect.width) * 2 - 1;
    mouse.y = -((event.clientY - boundingRect.top) / boundingRect.height) * 2 + 1;
});

const onResize = () => {
    if (refElement.current) {
      const container = refElement.current;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
  };
  
  const debouncedResize = debounce(onResize, 200);
  window.addEventListener('resize', debouncedResize);

  debouncedResize()

const info = document.getElementById(s.info)

let hoveredObject:any = null;

const animate = () => {
    requestAnimationFrame(animate);

    // Update the raycaster with the current mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(geometryGroup.children); 
    let timeoutID;

    if (intersects.length > 0) {
        // There's at least one intersection
        const intersectedObject = intersects[0].object;

        if (hoveredObject !== intersectedObject) {
            // New object is being hovered
            if (hoveredObject) {
                clearTimeout(timeoutID)
                // Reset the previous hovered object's state
                gsap.to(hoveredObject.rotation, { x: 0, y: 0, duration: 0.3 });
            }

            // Set the new hovered object
            hoveredObject = intersectedObject;

            // Apply hover effect
            gsap.to(hoveredObject.rotation, { x: -1, y: 0.3, duration: 0.2, ease: 'power1.out' });
            if(info){
                gsap.to(info, { opacity: 0, duration: 0.2 }).then(() => {
                    info.innerText = techSkills[+(intersectedObject.name)].description
                }).then(() => gsap.to(info, { opacity: 1, duration: 0.3 }));             
            }
        }
    } else {
        // No intersections detected
        if (hoveredObject) {
            // Reset the hovered object's state
            gsap.to(hoveredObject.rotation, { x: 0, y: 0, duration: 0.3 });

            // Clear the hovered object
            hoveredObject = null;

        }
    }

    renderer.render(scene, camera);
    return () => window.removeEventListener('resize', debouncedResize);
};

        animate()
    }, [])

    return(
        <div className={s.container}>
            <div className={s.canvasContainer} ref={refElement}>
                <p id={s.info}></p>
            </div>
        </div>
    )
}

export default Tile