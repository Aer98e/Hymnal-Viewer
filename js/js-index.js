// 1. Redimensión de letra
let currentSize = 16;
function changeFontSize(delta) {
    currentSize += delta;
    if (currentSize < 10) currentSize = 10;
    if (currentSize > 30) currentSize = 30;
    document.documentElement.style.setProperty('--base-font-size', currentSize + 'px');
}

function resetFontSize() {
    currentSize = 16;
    document.documentElement.style.setProperty('--base-font-size', '16px');
}

// 2. Generador aleatorio de círculos de fondo
function generateBackgroundCircles() {
    const container = document.getElementById('background-circles');
    const colors = ['#d2f1b4', '#f5f2b8', '#b2f2d7', '#b3d8f5']; // Verde, Amarillo, Menta, Azul
    
    // Obtener la altura total real del documento
    const pageHeight = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight
    );

    // Distancia vertical promedio entre círculos (px)
    const stepY = 220; 
    const totalCircles = Math.floor(pageHeight / stepY);

    for (let i = 0; i < totalCircles; i++) {
    const circle = document.createElement('div');
    circle.classList.add('bg-circle');

    // Tamaño aleatorio entre 110px y 170px
    const size = Math.floor(Math.random() * 60) + 110; 

    // Color aleatorio del array
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Posición X aleatoria con margen para no salir por los bordes (5% al 85%)
    const posX = Math.floor(Math.random() * 80) + 5;

    // Posición Y calculada por bloques con una variación aleatoria de +/- 40px
    const posY = (i * stepY) + 60 + (Math.random() * 80 - 40);

    // Aplicar estilos dinámicos
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;
    circle.style.left = `${posX}%`;
    circle.style.top = `${posY}px`;

    container.appendChild(circle);
    }
}

// 3. Manejador para abrir PDFs o carpetas de Google Drive en una nueva pestaña
function setupDrivePdfLinks() {
    const DRIVE_FILE_URL = 'https://drive.google.com/file/d/';
    const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/';

    document.addEventListener('click', function(event) {
        const element = event.target.closest('.card, .link');
        if (element) {
            const folderId = element.getAttribute('data-drive-folder-id');
            const fileId = element.getAttribute('data-drive-id');

            if (folderId && folderId !== 'ID_DEL_DIRECTORIO_AQUI') {
                const folderUrl = `${DRIVE_FOLDER_URL}${folderId}?usp=sharing`;
                window.open(folderUrl, '_blank', 'noopener,noreferrer');
            } else if (fileId && fileId !== 'ID_DEL_ARCHIVO_AQUI') {
                const pdfUrl = `${DRIVE_FILE_URL}${fileId}/view?usp=sharing`;
                window.open(pdfUrl, '_blank', 'noopener,noreferrer');
            }
        }
    });
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    generateBackgroundCircles();
    setupDrivePdfLinks();
});