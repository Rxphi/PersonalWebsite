
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight,
    GridHelper,
    IcosahedronGeometry,
    MeshStandardMaterial,
    Mesh,
    Color,
    Vector3,
    BoxGeometry,
    DodecahedronGeometry,
    ConeGeometry,
    OctahedronGeometry,
    TorusGeometry,
    TorusKnotGeometry,
    PointLight,
} from 'three';

import { OrbitControls } from 'OrbitControls';

// objects

const shapes = [
    new BoxGeometry(1, 1),
    new IcosahedronGeometry(1),
    new DodecahedronGeometry(1),
    // new CapsuleGeometry(1, 1, 10, 10),
    new ConeGeometry(1, 2),
    new OctahedronGeometry(1),
    new TorusGeometry(1, 0.5, 20, 100),
    new TorusKnotGeometry(1, 0.2, 100, 10),
]

// Setup the scene, camera renderer and light
const scene = new Scene();

const canvas = document.querySelector("#bg");
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // FOV, Aspect Ratio, View Frustum
camera.position.set(0, 0, 3);

var renderer = new WebGLRenderer({
    canvas,
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const ambientLight = new AmbientLight();
scene.add(ambientLight);

var editing = "";
var deltaColor = [0.01, 0.01, 0.01];

// const pointLightRed = new PointLight("red");
// pointLightRed.position.setY(10);
// scene.add(pointLightRed);

// const pointLightBlue = new PointLight("blue");
// pointLightBlue.position.setX(10);
// pointLightBlue.position.setY(-10);
// scene.add(pointLightBlue);

// const pointLightGreen = new PointLight("green");
// pointLightGreen.position.setX(-10);
// pointLightGreen.position.setY(-10);
// scene.add(pointLightGreen);

// orbit control
// const controls = new OrbitControls(camera, renderer.domElement);


// creating the object
var material = new MeshStandardMaterial({ wireframe: true });
var object = new Mesh();
object.material = material;
newGeometry();

// controls.target = object.position;

// Add Icosahedron to the scene
scene.add(object);


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    rotateObject();

    // controls.update();

    // render everything
    renderer.render(scene, camera);
}

function rotateObject() {
    object.rotateOnAxis(rotationAxes, 0.002)
}

function changeColors() {
    switch (editing) {
        case "r":
            console.log("Red");
            if (Math.abs(material.color.r + deltaColor[0] - 0.5) > 0.5) {
                deltaColor[0] *= -1;
            }
            material.color.r = (material.color.r + deltaColor[0]);
            break;
        case "g":
            console.log("Green");
            if (Math.abs(material.color.g + deltaColor[1] - 0.5) > 0.5) {
                deltaColor[1] *= -1;
            }
            material.color.g = (material.color.g + deltaColor[1]);
            break;
        case "b":
            console.log("Blue");
            if (Math.abs(material.color.b + deltaColor[2] - 0.5) > 0.5) {
                deltaColor[2] *= -1;
            }
            material.color.b = (material.color.b + deltaColor[2]);
            break;
        default:
            material.color = new Color("black");
    }
    renderer.render(scene, camera);
}

function newGeometry() {
    object.geometry = shapes[Math.floor(Math.random() * shapes.length)];
}

function newRotationAxes() {
    rotationAxes = new Vector3(Math.random(), Math.random(), Math.random()).normalize();
}

function resizeCanvas() {
    console.log("Resized canvas!");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("mousedown", event => {
    if (event.button == 0) {
        newGeometry();
    } else if (event.button == 2) {
        newRotationAxes();
    }
});

window.addEventListener("keypress", function (e) {
    if (e.key === "r") {
        editing = "r";
    } else if (e.key === "g") {
        editing = "g";
    } else if (e.key === "b") {
        editing = "b";
    } else if (e.key === "Enter") {
        editing = "";
    }
})


window.addEventListener("mousewheel", changeColors);
window.addEventListener("resize", resizeCanvas);

var rotationAxes = new Vector3(Math.random(), Math.random(), Math.random()).normalize();

var changeColorVector

renderer.render(scene, camera);
animate();