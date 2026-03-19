

const contenedor = document.getElementById('mosaico-fotos');
let indiceActual = 0;

// 2. RENDERIZADO DEL MOSAICO
fotos.forEach((item, index) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
    
    // Generamos el HTML según si es video o foto
    const mediaHTML = item.tipo === 'video' 
        ? `<video src="./img/${item.archivo}" class="img-fluid h-100 w-100" style="object-fit: cover; aspect-ratio: 1/1;" muted></video>`
        : `<img src="./img/${item.archivo}" class="img-fluid h-100 w-100" style="object-fit: cover; aspect-ratio: 1/1;" loading="lazy">`;

    // Solo añadimos el icono si es video
    const videoIcon = item.tipo === 'video' 
        ? '<div class="video-icon"><i class="bi bi-play-circle-fill"></i></div>' 
        : '';

    col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm overflow-hidden" onclick="abrirLightbox(${index})" style="cursor: pointer;">
            <div class="card-media-wrapper">
                ${mediaHTML}
                ${videoIcon}
            </div>
            <div class="card-body p-2 text-center">
                <small class="text-muted">${item.descripcion}</small>
            </div>
        </div>
    `;
    contenedor.appendChild(col);
});

// 3. LÓGICA DEL LIGHTBOX
function abrirLightbox(index) {
    indiceActual = index;
    actualizarLightbox();
    document.getElementById('lightbox').style.display = 'block';
}

function cerrarLightbox() {
    const videoElement = document.getElementById('video-ampliado');
    videoElement.pause(); // Importante: pausar el audio/video al salir
    videoElement.src = ""; // Liberar memoria
    document.getElementById('lightbox').style.display = 'none';
}

function actualizarLightbox() {
    const item = fotos[indiceActual];
    const imgElement = document.getElementById('img-ampliada');
    const videoElement = document.getElementById('video-ampliado');
    const caption = document.getElementById('caption');

    caption.innerText = item.descripcion;

    if (item.tipo === 'video') {
        // Modo Video
        imgElement.style.display = 'none';
        videoElement.style.display = 'block';
        videoElement.src = `./img/${item.archivo}`;
        videoElement.controls = true;
        videoElement.play();
    } else {
        // Modo Foto
        videoElement.pause();
        videoElement.style.display = 'none';
        imgElement.style.display = 'block';
        imgElement.src = `./img/${item.archivo}`;
    }
}

function cambiarFoto(direccion) {
    indiceActual += direccion;
    if (indiceActual >= fotos.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotos.length - 1;
    actualizarLightbox();
}

// 4. EVENTOS DE TECLADO
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'block') {
        if (e.key === "ArrowRight") cambiarFoto(1);
        if (e.key === "ArrowLeft") cambiarFoto(-1);
        if (e.key === "Escape") cerrarLightbox();
    }
});