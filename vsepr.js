var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera );

camera.position.set(0, 5, 5);
controls.update();

function animate() {
    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );

}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

var oxygen = new THREE.MeshBasicMaterial( {color: 0xff0000} );






var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );