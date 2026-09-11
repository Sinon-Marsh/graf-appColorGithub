// Captura de elementos del DOM
const redRange = document.getElementById('red');
const greenRange = document.getElementById('green');
const blueRange = document.getElementById('blue');

const redNum = document.getElementById('red-num');
const greenNum = document.getElementById('green-num');
const blueNum = document.getElementById('blue-num');

const colorPicker = document.getElementById('color-picker');
const colorBox = document.getElementById('color-box');
const rgbValue = document.getElementById('rgb-value');
const hexValue = document.getElementById('hex-value');
const hexOverlayText = document.getElementById('hex-overlay-text');

// Convierte un número decimal (0-255) a Hexadecimal de 2 dígitos
function componentToHex(c) {
    const hex = parseInt(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

// Función principal para refrescar la interfaz desde valores R, G, B
function updateUI(r, g, b) {
    // Sincronizar sliders y numéricos
    redRange.value = r; redNum.value = r;
    greenRange.value = g; greenNum.value = g;
    blueRange.value = b; blueNum.value = b;

    const hexCode = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();

    // Actualizar visualización
    colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    colorPicker.value = hexCode;
    rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
    hexValue.textContent = hexCode;
    hexOverlayText.textContent = hexCode;
}

// Evento cuando se mueven los Sliders o los Numéricos
function handleRGBInput(e) {
    let r = Math.min(255, Math.max(0, redRange.value || 0));
    let g = Math.min(255, Math.max(0, greenRange.value || 0));
    let b = Math.min(255, Math.max(0, blueRange.value || 0));

    // Si el evento vino de un campo numérico
    if (e.target === redNum) r = Math.min(255, Math.max(0, redNum.value || 0));
    if (e.target === greenNum) g = Math.min(255, Math.max(0, greenNum.value || 0));
    if (e.target === blueNum) b = Math.min(255, Math.max(0, blueNum.value || 0));

    updateUI(r, g, b);
}

// Evento cuando se usa el Color Picker (input type="color")
function handlePickerInput() {
    const hex = colorPicker.value;
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    updateUI(r, g, b);
}

// Asignar Event Listeners
[redRange, greenRange, blueRange, redNum, greenNum, blueNum].forEach(element => {
    element.addEventListener('input', handleRGBInput);
});

colorPicker.addEventListener('input', handlePickerInput);

// Estado inicial
updateUI(128, 128, 128);