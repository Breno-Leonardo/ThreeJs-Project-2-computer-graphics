// Controle de camera com GUI.

import * as THREE from 'three';
import {
	MTLLoader
} from './Assets/scripts/three.js/examples/jsm/loaders/MTLLoader.js';
import {
	OBJLoader
} from './Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';

import {
	FirstPersonControls
} from './Assets/scripts/three.js/examples/jsm/controls/FirstPersonControls.js';



var scene,
	renderer,
	camera, clock, obj, positionYMax, positionXMax, positionXMin, positionZMax, positionZMin,
	camControl;

const rendSize = new THREE.Vector2();

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {
	clock = new THREE.Clock(true);

	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(65.0, window.innerWidth / window.innerHeight, 0.01, 500.0);
	camControl = new FirstPersonControls(camera, renderer.domElement);


	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
	ambientLight.castShadow = true;
	scene.add(ambientLight);

	// const spotLight = new THREE.SpotLight(0xffffff, 2);
	// spotLight.position.set(-64, 0, 48);

	// spotLight.castShadow = true;

	// spotLight.shadow.mapSize.width = 1024;
	// spotLight.shadow.mapSize.height = 1024;

	// spotLight.shadow.camera.near = 20;
	// spotLight.shadow.camera.far = 4000;
	// spotLight.shadow.camera.fov = 30;

	// scene.add(spotLight);

	const spotLight2 = new THREE.SpotLight(0xffffff, 1.5);
	spotLight2.position.set(-100, 25, 45);

	spotLight2.castShadow = true;

	spotLight2.shadow.mapSize.width = 1024;
	spotLight2.shadow.mapSize.height = 1024;

	spotLight2.shadow.camera.near = 20;
	spotLight2.shadow.camera.far = 4000;
	spotLight2.shadow.camera.fov = 30;
	// spotLight2.angle=45;

	scene.add(spotLight2);
	loadTextures();
	buildScene();
	console.log(scene);
	render();
};


/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function onProgress(xhr) {

	if (xhr.lengthComputable) {
		const percentComplete = xhr.loaded / xhr.total * 100;
		console.log(Math.round(percentComplete, 2) + '% downloaded');
	}
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var objMTL = new MTLLoader();
	objMTL.setPath('./Assets/Models/OBJ/room/');

	objMTL.load('room.mtl', loadMaterials);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMaterials(materials) {

	materials.preload();

	var objLoader = new OBJLoader();
	objLoader.setMaterials(materials)
	objLoader.setPath('./Assets/Models/OBJ/room/')
	objLoader.load('room.obj', loadMesh, onProgress);

	//Bunny
	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load("./Assets/Models/OBJ/AtlasModels/bunny-atlas.jpg");

	const material = new THREE.MeshBasicMaterial({
		map: texture
	});
	var objLoader2 = new OBJLoader();
	objLoader2.setPath("./Assets/Models/OBJ/AtlasModels/");
	objLoader2.load('bunny.obj', function (object) {
		object.name = "bunny";
		object.children.forEach(function (child) {
			child.material = material;
		});
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		object.scale.setScalar(0.005);
		object.position.x = -83;
		object.position.y = -13.25;
		object.position.z = 11;
		// object.rotation.y = 15;
		scene.add(object);
	}, onProgress, );

	//Teapot
	const textureLoader2 = new THREE.TextureLoader();
	const texture2 = textureLoader2.load("./Assets/Textures/Marble1.jpg");
	const material2 = new THREE.MeshPhongMaterial({
		map: texture2
	});
	var objLoader2 = new OBJLoader();
	objLoader2.setPath("./Assets/Models/OBJ/");
	objLoader2.load('teapot.obj', function (object) {
		object.name = "teapot";
		object.children.forEach(function (child) {
			child.material = material2;
		});
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		object.scale.setScalar(0.025);
		object.position.x = -75;
		object.position.y = -14.15;
		object.position.z = 9;
		scene.add(object);
	}, onProgress, );


	//cupHIRES
	var objLoader3 = new OBJLoader();
	objLoader3.setPath("./Assets/Models/OBJ/room/");
	objLoader3.load('cup.obj', function (object) {
		object.name = "cup";
		object.children.forEach(function (child) {
			child.material = material2;

		});
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				
			}
		});
		object.scale.setScalar(0.1);
		object.position.x = -75;
		object.position.y = -14.75;
		object.position.z = 14;
		scene.add(object);
	}, onProgress, );

	//cake
	const textureLoader3 = new THREE.TextureLoader();
	const texture3 = textureLoader3.load("./Assets/Models/OBJ/room/cake.png");
	const material3 = new THREE.MeshPhongMaterial({
		map: texture3
	});
	var objLoader3 = new OBJLoader();
	objLoader3.setPath("./Assets/Models/OBJ/room/");
	objLoader3.load('cake.obj', function (object) {
		object.name = "cake";
		object.children.forEach(function (child) {
			child.material = material3;

		});
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				
			}
		});
		object.scale.setScalar(0.1);
		object.position.x = -77;
		object.position.y = -13.8;
		object.position.z = 3;
		scene.add(object);
	}, onProgress, );
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(object) {

	object.name = "cena";
	object.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		}
	});
	scene.add(object);

	ajusteCamera();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function ajusteCamera() {

	obj = scene.getObjectByName("cena");
	const helper = new THREE.BoxHelper();
	helper.setFromObject(obj);

	helper.geometry.computeBoundingBox();

	const box = new THREE.Box3().setFromObject(obj);


	camera.lookAt(new THREE.Vector3(-75, -14, 9));

	var farPlane = Math.max((box.max.x - box.min.x),
		(box.max.y - box.min.y),
		(box.max.z - box.min.z));

	camera.far = farPlane * 10.0;
	camera.updateProjectionMatrix();
	camControl.lookSpeed = 0.035;
	camControl.movementSpeed = 20;
	camControl.noFly = false;
	camControl.lookVertical = true;
	camControl.constrainVertical = true;


}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function loadTextures() {

	// cria Mapeamento de Ambiente
	const path = "./Assets/Textures/Cubemaps/Room/";
	const textCubeMap = [path + "RoomPosZ.png",
		path + "RoomNegX.jpg",
		path + "RoomPosY.jpg",
		path + "RoomNegY.jpg",
		path + "RoomPosX.png",
		path + "RoomNegZ.jpg"
	];

	const textureCube = new THREE.CubeTextureLoader().load(textCubeMap);
	scene.background = textureCube;


}

function render() {

	// console.log("position x: " + camera.position.x);
	// console.log("position y: " + camera.position.y);
	// console.log("position z: " + camera.position.z);

	camera.position.x =-56;
	camera.position.y =2;
	camera.position.z =-6;


	camControl.update(clock.getDelta());
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
