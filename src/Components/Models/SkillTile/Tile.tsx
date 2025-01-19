import {useRef, useEffect} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

const Tile = () => {

    const refElement = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.TextureLoader().load('src/assets/space.jpg')

// Perspective Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100); // Move the camera far away
camera.zoom = 15; // High zoom to reduce perspective distortion
camera.updateProjectionMatrix(); // Apply zoom changes

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add light for 3D models
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(5, -5, 7.5);
scene.add(light1);

const light = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 0, 2);
scene.add(light);

// Add multiple 3D cubes
const geometry = new THREE.BoxGeometry(1, 1, 0.33);
const defaultMaterial = new THREE.MeshStandardMaterial({ color: 0xf3f3f3 });

const iconMaterial = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load('src/assets/react.png'), color: 0xf3f3f3})

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 224;
canvas.height = 84;

if(context){
    context.fillStyle = '#646161'; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#000000'; // Text color
    context.font = '60px Arial'; // Font size and family
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('React', canvas.width / 2, canvas.height / 1.7);
}

const textTexture = new THREE.CanvasTexture(canvas)
const textMaterial = new THREE.MeshBasicMaterial({map: textTexture});

const materials = [
    defaultMaterial,
    defaultMaterial,
    defaultMaterial,
    textMaterial,
    iconMaterial,
    defaultMaterial,
]

const cubes = new THREE.Group();
for (let i = 0; i < 10; i++) {
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(i + 0.4 * i, 0, 0); // Arrange in a row
    cubes.add(cube);
}

cubes.position.setX(-6.3)
scene.add(cubes)

// Optional: Add OrbitControls for interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Raycaster and Mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle mouse movement
window.addEventListener('mousemove', (event) => {
    const boundingRect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - boundingRect.left) / boundingRect.width) * 2 - 1;
    mouse.y = -((event.clientY - boundingRect.top) / boundingRect.height) * 2 + 1;
});

// Animation Loop
let hoveredObject:any = null;

const animate = () => {
    requestAnimationFrame(animate);

    // Update the raycaster with the current mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(cubes.children); // Check all cubes in the group

    if (intersects.length > 0) {
        // There's at least one intersection
        const intersectedObject = intersects[0].object;

        if (hoveredObject !== intersectedObject) {
            // New object is being hovered
            if (hoveredObject) {
                // Reset the previous hovered object's state
                gsap.to(hoveredObject.rotation, { x: 0, duration: 0.3 });
            }

            // Set the new hovered object
            hoveredObject = intersectedObject;

            // Apply hover effect
            gsap.to(hoveredObject.rotation, { x: -1, duration: 0.3, ease: 'power1.out' });
        }
    } else {
        // No intersections detected
        if (hoveredObject) {
            // Reset the hovered object's state
            gsap.to(hoveredObject.rotation, { x: 0, duration: 0.3 });

            // Clear the hovered object
            hoveredObject = null;
        }
    }

    // Render the scene
    renderer.render(scene, camera);
};

        animate()
    }, [])

    return(
        <div ref={refElement}></div>
    )
}

export default Tile