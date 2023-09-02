
function saludar() {
    alert('Hola!');
}

const div = document.getElementById('miDiv');
const btn = document.getElementById('btn');

div.addEventListener('click', () => {
    alert('Soy el div!')
});

btn.addEventListener('click', (event) => {
    event.stopPropagation()
    saludar()
});