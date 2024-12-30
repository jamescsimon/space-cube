import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

const geometry = new THREE.BoxGeometry(10, 10, 10);
        
//set the color of the basic material in the object parameters `{}`
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.position.z = -15;
cube.position.x = -15;

cube.rotation.x = 2;
cube.rotation.y = .5;

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 15;

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

// Orbit Control
const controls = new OrbitControls(camera, renderer.domElement)

function animate() {

  requestAnimationFrame( animate );

  // slowly rotate the cube:
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // rotate the icosahedron a little faster in the opposite direction:
  icoMesh.rotation.z += -0.01
  icoMesh.rotation.y += -0.01

  // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
  controls.update()

  renderer.render( scene, camera );
}

animate();

// Background
const spaceTexture = new THREE.TextureLoader().load('images/night_sky.jpg');
scene.background = spaceTexture;