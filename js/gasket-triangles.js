"use strict";
const{vec3} = glMatrix;
var canvas;
var gl;
var points;
var str;
var numTimesToSubdivide = 4;
var theta = 60;


var colors = [];

function initTriangles(){
	
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	points = [];
	// Three Vertices
	if (str == '2D'){
		var vertices = [
			-1, -1, 0,
			 0,  1, 0, 
			 1, -1, 0
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
		}
		
	if (str == '3D'){
		var vertices = [
		    0.0000, 0.0000, -1.0000,
		    0.0000, 0.9428, 0.3333,
		    -0.8165, -0.4714, 0.3333,
		    0.8165, -0.4714, 0.3333
		];
		
		// var t = vec3.create();
		// vec3.set(t, vertices[0], vertices[1], vertices[2]);
		var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
		// var u = vec3.create();
		// vec3.set(u, vertices[3], vertices[4], vertices[5]);
		var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
		// var v = vec3.create();
		// vec3.set(v, vertices[6], vertices[7], vertices[8]);
		var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
		// var w = vec3.create();
		// vec3.set(w, vertices[9], vertices[10], vertices[11]);
		var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );
		changeLevel();
		divideTetra(t, u, v, w, numTimesToSubdivide);
		// configure webgl
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		
		// enable hidden-surface removal
		gl.enable(gl.DEPTH_TEST);
		
		// load shaders and initialize attribute buffers
		var program = initShaders(gl, "vertex-shader-3d", "fragment-shader-3d");
		gl.useProgram(program);
		
		// create buffer object, initialize it, and associate it with
		// attribute variables in vertex shader
		
		var vBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
		
		var vPosition = gl.getAttribLocation(program, "vPosition");
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vPosition);
		
		var cBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		
		var vColor = gl.getAttribLocation(program, "vColor");
		gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vColor);
	}
	
	if(str == 'line'){
		var vertices = [
			-1, -1, 0,
			 0,  1, 0, 
			 1, -1, 0
		];
		
		var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
		var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
		var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);
		changeLevel();
		divideLine(u, v, w, numTimesToSubdivide);
		
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
	}
	if(str == 'nochangeshape'){
		var vertices = [
			-0.65, -0.65, 0,
			 0,  0.65, 0, 
			 0.65, -0.65, 0
		];
		
		var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
		var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
		var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);
		changeRound();
		divideRound(u, v, w, numTimesToSubdivide);
		
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
	}
	if(str == 'changeshape'){
		var vertices = [
				-0.865, -0.5, 0,
				 0,  1, 0, 
				 0.865, -0.5, 0
			];
			
			var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
			var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
			var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);
			changeRound();
			divideChange(u, v, w, numTimesToSubdivide);
			
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
	}
	if(str == '2D')renderTriangles();
	if(str == '3D')render_3d();
	if(str == 'line')renderLine();
	if(str == 'nochangeshape')renderRound();
	if(str == 'changeshape')renderChange();
	
}

function changeLevel(){
		numTimesToSubdivide = document.getElementById("vol").value;
		document.getElementById("demo").innerHTML = "level: " + numTimesToSubdivide;
		console.log(numTimesToSubdivide);
	}

function triangle(a, b, c){
	points.push(a[0], a[1], a[2]);
	points.push(b[0], b[1], b[2]);
	points.push(c[0], c[1], c[2]);
}

function divideTriangle(a, b, c, count){
	if(count == 0){
		triangle(a, b, c);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);
		--count;
		
		divideTriangle(a, ab, ca, count);
		divideTriangle(b, bc, ab, count);
		divideTriangle(c, ca, bc, count);
	}
}
function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
}

function mySub(){
	var dim = document.getElementsByName("dim");
	for (var i=0;i<dim.length;i++){
		if(dim[i].checked)
			str = dim[i].value;
	}
	alert(str);
	initTriangles();
}

function myRound(){
	var round = document.getElementsByName("round");
	for(var i=0;i<round.length;i++){
		if(round[i].checked)str = round[i].value;
	}
	alert(str);
	initTriangles();
}

function changeLevel(){
	numTimesToSubdivide = document.getElementById("vol").value;
	document.getElementById("demo").innerHTML = "level: " + numTimesToSubdivide;
	console.log(numTimesToSubdivide);
}

function changeRound(){
		theta = document.getElementById("round").value;
		document.getElementById("demo1").innerHTML = "level: " + theta;
		console.log(theta);
	}

function triangle(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 0.0
    ];

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(a[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(b[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(c[k]);
}



function tetra(a, b, c, d) {
    triangle(a, c, b, 0);
    triangle(a, c, d, 1);
    triangle(a, b, d, 2);
    triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra(a, b, c, d);
    } else {
        var ab = vec3.create();
        vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        vec3.lerp(cd, c, d, 0.5);

        --count;

        divideTetra(a, ab, ac, ad, count);
        divideTetra(ab, b, bc, bd, count);
        divideTetra(ac, bc, c, cd, count);
        divideTetra(ad, bd, cd, d, count);
    }

}

function render_3d() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
}

function triangleLine(a, b, c){
	points.push(a[0], a[1], a[2]);
	points.push(b[0], b[1], b[2]);
	
	points.push(b[0], b[1], b[2]);
	points.push(c[0], c[1], c[2]);
	
	points.push(c[0], c[1], c[2]);
	points.push(a[0], a[1], a[2]);
}

function divideLine(a, b, c, count){
	if(count == 0){
		triangleLine(a, b, c);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);
		
		divideLine(a, ab, ca, count-1);
		divideLine(b, bc, ab, count-1);
		divideLine(c, ca, bc, count-1);
		divideLine(ab, bc, ca, count-1);
	}
}
function renderLine(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}

function triangleRound(a, b, c, theta){
	theta = theta * Math.PI / 180.0;
	
	points.push(a[0] * Math.cos(theta) - a[1] * Math.sin(theta), a[0] * Math.sin(theta) + a[1] * Math.cos(theta), a[2]);
	points.push(b[0] * Math.cos(theta) - b[1] * Math.sin(theta), b[0] * Math.sin(theta) + b[1] * Math.cos(theta), b[2]);
	
	points.push(b[0] * Math.cos(theta) - b[1] * Math.sin(theta), b[0] * Math.sin(theta) + b[1] * Math.cos(theta), b[2]);
	points.push(c[0] * Math.cos(theta) - c[1] * Math.sin(theta), c[0] * Math.sin(theta) + c[1] * Math.cos(theta), c[2]);
	
	points.push(c[0] * Math.cos(theta) - c[1] * Math.sin(theta), c[0] * Math.sin(theta) + c[1] * Math.cos(theta), c[2]);
	points.push(a[0] * Math.cos(theta) - a[1] * Math.sin(theta), a[0] * Math.sin(theta) + a[1] * Math.cos(theta), a[2]);
}

function divideRound(a, b, c, count){
	if(count == 0){
		triangleRound(a, b, c, theta);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);
		
		divideRound(a, ab, ca, count-1);
		divideRound(b, bc, ab, count-1);
		divideRound(c, ca, bc, count-1);
		divideRound(ab, bc, ca, count-1);
	}
}
function renderRound(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}

function triangleChange(a, b, c, theta){
	var zerovec3 = vec3.create();
	vec3.zero( zerovec3 );
	var radian;
	var a_new = vec3.create();
	var b_new = vec3.create();
	var c_new = vec3.create();
	radian = theta * Math.PI / 180.0;
	
	
	var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
	var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
	var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );
	
	vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
		a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
	vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
		b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
	vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
		c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
	
	points.push(a_new[0], a_new[1], a_new[2]);
	points.push(b_new[0], b_new[1], b_new[2]);
	points.push(b_new[0], b_new[1], b_new[2]);
	points.push(c_new[0], c_new[1], c_new[2]);
	points.push(c_new[0], c_new[1], c_new[2]);
	points.push(a_new[0], a_new[1], a_new[2]);
}

function divideChange(a, b, c, count){
	if(count == 0){
		triangleChange(a, b, c, theta);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);
		
		divideChange(a, ab, ca, count-1);
		divideChange(b, bc, ab, count-1);
		divideChange(c, ca, bc, count-1);
		divideChange(ab, bc, ca, count-1);
	}
}
function renderChange(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}