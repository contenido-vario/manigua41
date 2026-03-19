const fotos = [
  {id:1,  archivo: 'fachada.jpg', descripcion: 'Fachada'}, 
  {id:2,  archivo: 'equipo.jpg', descripcion: 'Nuestro Equipo'}, 
  {id:3,  archivo: 'pasillos.jpg', descripcion: 'Interiores'}, 
  {id:4,  archivo: 'jardines.jpg', descripcion: 'Jardines'}, 
  {id:5,  archivo: 'capillas.jpg', descripcion: 'Capillas de Velación'}, 
  {id:6,  archivo: 'oficinas.jpg', descripcion: 'Oficinas'}, 
  {id:7,  archivo: 'servicios.jpg', descripcion: 'Servicios'}, 
  {id:8,  archivo: 'ataudes.jpg', descripcion: 'Variedad de ataúdes'},  
];

// --- PARTE 1: GENERAR EL MOSAICO ---
const contenedor = document.getElementById('mosaico-fotos');

fotos.forEach((foto, index) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3'; // Ajuste de columnas responsivo
    
    col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm overflow-hidden">
            <img src="./img/${foto.archivo}" 
                 class="img-fluid h-100 w-100" 
                 alt="${foto.descripcion}"
                 loading="lazy" 
                 onclick="abrirLightbox(${index})"
                 style="object-fit: cover; cursor: zoom-in; aspect-ratio: 1/1;">
            <div class="card-body p-2 text-center">
                <small class="text-muted">${foto.descripcion}</small>
            </div>
        </div>
    `;
    contenedor.appendChild(col);
});

// --- PARTE 2: LÓGICA DEL LIGHTBOX ---
let indiceActual = 0;

function abrirLightbox(index) {
  indiceActual = index;
  actualizarLightbox();
  document.getElementById('lightbox').style.display = 'block';
}

function cerrarLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function actualizarLightbox() {
  const foto = fotos[indiceActual];
  document.getElementById('img-ampliada').src = `./img/${foto.archivo}`;
  document.getElementById('caption').innerText = foto.descripcion;
}

function cambiarFoto(direccion) {
  indiceActual += direccion;
  if (indiceActual >= fotos.length) indiceActual = 0;
  if (indiceActual < 0) indiceActual = fotos.length - 1;
  actualizarLightbox();
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').style.display === 'block') {
    if (e.key === "ArrowRight") cambiarFoto(1);
    if (e.key === "ArrowLeft") cambiarFoto(-1);
    if (e.key === "Escape") cerrarLightbox();
  }
});