

function saludar() {
    alert('Hola!')
}

document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById('miDiv');
    div.addEventListener('click', () => {
        alert('Soy el div!')
    });
});




