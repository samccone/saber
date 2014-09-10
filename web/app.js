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
// var geometry = new THREE.BoxGeometry(1,10,1);
var geometry = new THREE.PlaneGeometry(4,100);
geometry.applyMatrix( new THREE.Matrix4().makeRotationY(Math.PI/2) );
geometry.merge( new THREE.PlaneGeometry(4,100));


var generateLaserCanvas = function(){
	// init canvas
	var canvas	= document.createElement( 'canvas' );
	var context	= canvas.getContext( '2d' );
	canvas.width	= 8;
	canvas.height	= 16;
	// set gradient
	var gradient	= context.createRadialGradient(
		canvas.width/2, canvas.height /2, 0,
		canvas.width/2, canvas.height /2, canvas.width /2
	);		
	gradient.addColorStop( 0  , 'rgba(255,255,255,0.7)' );
	gradient.addColorStop( 0.5, 'rgba(192,192,192,0.5)' );
	gradient.addColorStop( 0.8, 'rgba(128,128,128,0.3)' );
	gradient.addColorStop( 1  , 'rgba(0,0,0,0)' );

	// fill the rectangle
	context.fillStyle	= gradient;
	context.fillRect(0,0, canvas.width, canvas.height);
	// return the just built canvas 
	return canvas;	
};
var canvas	= generateLaserCanvas();
	var texture	= new THREE.Texture( canvas );
	texture.needsUpdate = true;
var material	= new THREE.MeshBasicMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
		color		: 0xffaacc,
		side		: THREE.DoubleSide,
		depthWrite	: false,
		transparent	: true
	});


var blade = new THREE.Mesh( geometry, material );

scene.add( blade );

camera.position.z = 30;

blade.applyMatrix( new THREE.Matrix4().makeTranslation(0, 5, 0) );

blade.position.y=-1;
(function() {


  blade.rotation.z = x;
  blade.rotation.x = y;
  requestAnimationFrame(arguments.callee);
  renderer.render(scene, camera);
})();