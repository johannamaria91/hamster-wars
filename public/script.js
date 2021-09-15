const btn = document.getElementById('start-btn');
const text = document.getElementById('war-text');

btn.addEventListener('click', () => {
    text.classList.toggle('hide')
})