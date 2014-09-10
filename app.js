var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
var x = 0;
var y = 0;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

document.addEventListener("mousemove", function(e) {
  x = e.x / window.innerWidth;
  y = e.y / window.innerHeight;
})
var geometry = new THREE.BoxGeometry(1,10,1);
var material = new THREE.MeshBasicMaterial( { wireframe: 1 } );
var blade = new THREE.Mesh( geometry, material );

scene.add( blade );

camera.position.z = 10;

blade.applyMatrix( new THREE.Matrix4().makeTranslation(0, 5, 0) );

blade.position.y=-1;
(function() {


  blade.rotation.z = x;
  blade.rotation.x = y;
  requestAnimationFrame(arguments.callee);
  renderer.render(scene, camera);
})();