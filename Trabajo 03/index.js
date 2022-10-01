/*Alumno: Ian Gerardo Horcasitas Pérez
Código: 21658618
Materia: Programación para internet
Sección: D04
Profesor: José Luis David Bonilla Carranza
*/ 

//Los elementos graficos- la escena, la camara y el renderer
const scene = new THREE.Scene() 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ) //Perspective camera es el tipo de camara, se compone de los elementos "alcance de vista", "ratio de aspecto (tamaño)", "plano de objetos cercanos" (los objetos no aparecen antes de ciertpo punto), "plano de objetos lejanos" (los objetos no apaceen despues de cierto punto)
const renderer = new THREE.WebGLRenderer({ antialias: true}) //para que los bordes sean suaves

//Ajustamos el tamaño del renderer al de la pantalla
renderer.setSize( window.innerWidth, window.innerHeight )

// Establecer el fondo del renderer
renderer.setClearColor("#302f2f")  
document.body.appendChild( renderer.domElement )
camera.position.z = 5

// Ajustar el canvas a la ventana
window.addEventListener( 'resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize( width, height )
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

// Cubo 
var geometry = new THREE.BoxGeometry( 1, 1, 1)  //Crea una figura con forma de caja
var material = new THREE.MeshStandardMaterial( { color: 0xfdd735, flatShading: true, metalness: 0, roughness: 1 }) //Material del objeto
var cube = new THREE.Mesh ( geometry, material ) //Forma el cubo con ambos elementos
scene.add( cube )

// Cubo estructural externo
var geometry = new THREE.BoxGeometry( 3, 3, 3) 
var material = new THREE.MeshBasicMaterial( {
    color: "#dadada", wireframe: true, transparent: true //La propiedad wireframe nos permite ver la estructura
})
var wireframeCube = new THREE.Mesh ( geometry, material )
scene.add( wireframeCube )

// Luz de ambiente, se aplica a todo. No genera sombras.
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2) //Color e intensidad de la luz
scene.add( ambientLight ) //Agrega la luz a la escena

// Luz de punto (Point Light). Lanza luz en todas as direcciones desde su posicion
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );


function animate() {  //Funcion para animar los cubos, se llama 60 veces x segundo (60 fps)
    requestAnimationFrame( animate )
    cube.rotation.x += 0.03; //Rota 0.03 radianes en la coordenada indicada cada vez que es llamado
    cube.rotation.y += 0.03;
    wireframeCube.rotation.x -= 0.04;
    wireframeCube.rotation.y -= 0.04;
    renderer.render( scene, camera ) //Muestra el cambio
}
animate()