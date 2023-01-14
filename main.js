import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat, randInt } from 'three/src/math/MathUtils';
import { Color } from 'three';

// Setup the scene, camera renderer and light
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // FOV, Aspect Ratio, View Frustum
camera.position.set(0, 15, 25);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// const pointLight = new THREE.PointLight("white");
// pointLight.position.set(10, 0, 0)
// scene.add(pointLight);
// light helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
// axes helper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
// grid helper 
const gridHelper = new THREE.GridHelper(500, 50);
scene.add(gridHelper);

// orbit control
// const controls = new OrbitControls(camera, renderer.domElement);

// Making the Icosahedron
const geometry = new THREE.IcosahedronGeometry(5, 0);
const material = new THREE.MeshStandardMaterial({ wireframe: true });
const object = new THREE.Mesh(geometry, material);
object.position.set(0, 15, 0);

// Add Icosahedron to the scene
scene.add(object);


// Animation loop
function animate() {
    requestAnimationFrame(animate);



    rotateObject();

    // render everything
    renderer.render(scene, camera);
}

function rotateObject() {
    object.rotateOnAxis(rotationAxes, 0.002)

    renderer.render(scene, camera);
}

function changeColors() {
    console.log("changing colors")
    const r = randFloat(0, 1);
    const g = randFloat(0, 1);
    const b = randFloat(0, 1);


    material.color = new THREE.Color(r, g, b);

    renderer.render(scene, camera);
}

document.body.onclick = changeColors;
const rotationAxes = new THREE.Vector3(randFloat(0, 1), randFloat(0, 1), randFloat(0, 1)).normalize();
renderer.render(scene, camera);
animate();