"use strict";
const{vec3} = glMatrix;
var canvas;
var gl;
var points;
var theta = 60;
var numTimesToSubdivide = 4;
var da, db, dc;
function initTriangles(){
	
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	points = [];
	// Three Vertices
	var vertices = [
		-0.65, -0.65, 0,
		 0,  0.65, 0, 
		 0.65, -0.65, 0
	];
	
	var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
	var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
	var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);
	changeLevel();
	divideTriangle(u, v, w, numTimesToSubdivide);
	
	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	renderTriangles();
	
}

function changeLevel(){
		theta = document.getElementById("vol").value;
		document.getElementById("demo").innerHTML = "level: " + theta;
		console.log(theta);
	}

function triangle(a, b, c, theta){
	theta = theta * Math.PI / 180.0;
	da = Math.sqrt(a[0]*a[0]+a[1]*a[1]);
	db = Math.sqrt(b[0]*b[0]+b[1]*b[1]);
	dc = Math.sqrt(c[0]*c[0]+c[1]*c[1]);
	
	points.push(a[0] * Math.cos(da*theta) - a[1] * Math.sin(da*theta), a[0] * Math.sin(da*theta) + a[1] * Math.cos(da*theta), a[2]);
	points.push(b[0] * Math.cos(db*theta) - b[1] * Math.sin(db*theta), b[0] * Math.sin(db*theta) + b[1] * Math.cos(db*theta), b[2]);
	
	points.push(b[0] * Math.cos(db*theta) - b[1] * Math.sin(db*theta), b[0] * Math.sin(db*theta) + b[1] * Math.cos(db*theta), b[2]);
	points.push(c[0] * Math.cos(dc*theta) - c[1] * Math.sin(dc*theta), c[0] * Math.sin(dc*theta) + c[1] * Math.cos(dc*theta), c[2]);
	
	points.push(c[0] * Math.cos(dc*theta) - c[1] * Math.sin(dc*theta), c[0] * Math.sin(dc*theta) + c[1] * Math.cos(dc*theta), c[2]);
	points.push(a[0] * Math.cos(da*theta) - a[1] * Math.sin(da*theta), a[0] * Math.sin(da*theta) + a[1] * Math.cos(da*theta), a[2]);
}

function divideTriangle(a, b, c, count){
	if(count == 0){
		triangle(a, b, c, theta);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);
		
		divideTriangle(a, ab, ca, count-1);
		divideTriangle(b, bc, ab, count-1);
		divideTriangle(c, ca, bc, count-1);
		divideTriangle(ab, bc, ca, count-1);
	}
}
function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}