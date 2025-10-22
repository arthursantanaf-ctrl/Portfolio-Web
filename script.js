
const themeButton = document.querySelector('#theme-toggle');
const pageBody = document.querySelector('body');

themeButton.addEventListener('click', () => {
    pageBody.classList.toggle('dark-mode'); 

    if (pageBody.classList.contains('dark-mode')) {
        themeButton.textContent = 'Modo Claro';
    } else {
        themeButton.textContent = 'Modo Noturno';
    }
});



const cycleButton = document.querySelector('#color-cycle-button');
const root = document.documentElement; 


const colors = ['#007BFF', '#28a745', '#dc3545']; 
let currentColorIndex = 0; 

cycleButton.addEventListener('click', () => {
    
    currentColorIndex++;
  
    
    if (currentColorIndex >= colors.length) {
        currentColorIndex = 0;
    }
    
    
    const newColor = colors[currentColorIndex];
    
    
    root.style.setProperty('--primary-color', newColor)
});
