import * as THREE from './../../three/build/three.module.js';
let renderer, camera, scene, cube;

let test = 0;

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('../Static/models/bump.jpg');

let SCREEN_WIDTH,SCREEN_HEIGHT,SCREEN_LEFT,SCREEN_TOP;
let container = document.getElementById("canvasPro");

let value;


function onWindowResize(){
    let w = container.offsetWidth;
    let h = container.offsetHeight;
    SCREEN_WIDTH = container.scrollWidth;
    SCREEN_HEIGHT = container.scrollHeight;
    SCREEN_LEFT = container.offsetLeft - container.scrollLeft + container.clientLeft;
    SCREEN_TOP = container.offsetTop - container.scrollTop + container.clientTop;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function start() {
    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({
        canvas: container,
        alpha: true
    });

    // création d'un canvas qui remplit la fenêtre
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', onWindowResize, false);
    // renderer.setClearColor(0xFFFFFF,0);
    document.body.appendChild(renderer.domElement);

    let w = container.offsetWidth;
    let h = container.offsetHeight;
    SCREEN_WIDTH = container.scrollWidth;
    SCREEN_HEIGHT = container.scrollHeight;
    SCREEN_LEFT = container.offsetLeft - container.scrollLeft + container.clientLeft;
    SCREEN_TOP = container.offsetTop - container.scrollTop + container.clientTop;
    renderer.setSize(w, h);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,6000);
    // controls = new OrbitControls(camera,renderer.domElement);
    camera.position.set(0,0,600);

    // création de la scène
    scene = new THREE.Scene();
    scene.add(camera);

    const material2 = new THREE.MeshStandardMaterial();
    material2.roughness = 0.2;
    material2.metalness = 0.7;
    material2.normalMap = normalTexture;
    material2.color = new THREE.Color(0x333333);
    material2.emissive = new THREE.Color(0x000000);

    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    let pointLight = new THREE.PointLight(0xffffff,0.1);
    let pointLight2 = new THREE.PointLight(0xffffff,2);
    let pointLight3 = new THREE.PointLight(0xff0000,2);
    let pointLight4 = new THREE.PointLight(0xff0000,2);
    let lightBack = new THREE.PointLight(0xffffff,6);

    let p = window.innerWidth;

    if (window.innerWidth < 600){
        p = p / 4;
        const geometry =  new THREE.OctahedronGeometry(p, 0);
        cube = new THREE.Mesh(geometry, material2);
        cube.position.set(0,10,0);

        ambientLight.position.set(200,200,100);
        pointLight.position.set(100,100,100);
        pointLight2.position.set(100,150,100);
        pointLight3.position.set(100,-150,100);
        pointLight4.position.set(-50,-250,200);
        lightBack.position.set(-200,100,-300);

        scene.add(cube);
    }else if(window.innerWidth > 1600){
        const geometry =  new THREE.SphereGeometry(
            window.innerWidth / 10, 64, 64
        );
        cube = new THREE.Mesh(geometry, material2);
        cube.position.set(0,10,0);

        ambientLight.position.set(200,200,100);
        pointLight.position.set(200,100,100);
        pointLight2.position.set(200,250,100);
        pointLight3.position.set(200,-150,100);
        pointLight4.position.set(-150,-250,200);
        lightBack.position.set(-350,200,-300);

        scene.add(cube);
    } else{
        const geometry =  new THREE.SphereGeometry(
            window.innerWidth / 7, 64, 64
        );
        cube = new THREE.Mesh(geometry, material2);
        cube.position.set(0,10, 0);

        ambientLight.position.set(300,300,200);
        pointLight.position.set(200,200,200);
        pointLight2.position.set(200,250,200);
        pointLight3.position.set(200,-250,200);
        pointLight4.position.set(-100,-250,200);
        lightBack.position.set(-300,200,-300);

        scene.add(cube);
    }

    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.add(pointLight3);
    scene.add(pointLight4);
    scene.add(lightBack);
}

function animate() {
    renderer.render(scene, camera);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.001;

    window.addEventListener('scroll',() => {
        value = window.scrollY;
        cube.position.z = value * -0.3;
    });

    requestAnimationFrame(animate);
}

start();
animate();