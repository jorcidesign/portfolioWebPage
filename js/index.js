//movimiento de mouse en hero
let emptyElement = document.querySelector(".hero-img");
let titleElement = document.querySelector(".hero-name");
let section = document.querySelector(".hero");

section.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  emptyElement.style.flexBasis = event.clientX + "px";
  titleElement.style.flexBasis = event.clientY / 2 + "px";

  figureElements.forEach(function (element) {
    element.style.flexBasis = window.innerWidth - event.clientX + "px";
  });
}

//Parallax about

document.addEventListener("DOMContentLoaded", function () {
  // Obtén la sección "About"
  const aboutSection = document.getElementById("about");
  // Obtén el contenedor dentro de "About"
  const aboutContainer = aboutSection.querySelector(".about-container");

  // Agrega un evento de scroll
  window.addEventListener("scroll", function () {
    // Calcula el desplazamiento del scroll
    let scrollPosition = window.scrollY;

    // Aplica el efecto de parallax solo en la dirección vertical
    aboutContainer.style.transform =
      "translateY(" + scrollPosition * 0.1 + "px)";
  });
});

//Scroll font size

document.addEventListener("DOMContentLoaded", function () {
    // Obtén el elemento que deseas cambiar (puedes cambiar el selector según tu HTML)
    const elementToTransform = document.querySelector(".separate-title");
    
    // Obtén el contenedor del título para aplicar estilos de desbordamiento
    const dc = elementToTransform.parentElement;
    const titleContainer = dc.parentElement; 
  
    // Define la cantidad de unidades después de las cuales se inicia la transformación
    const triggerOffset = 1600;
  
    // Almacena la posición anterior del scroll
    let prevScrollPos = window.scrollY;
  
    // Agrega un evento de scroll
    window.addEventListener("scroll", function () {
      // Obtén la posición actual del scroll
      const currentScrollPos = window.scrollY;
  
      // Verifica si el desplazamiento ha superado el desencadenante
      if (currentScrollPos > triggerOffset) {
        // Calcula la escala en función de la dirección del scroll
        let scale = Math.min(20, 1 + 0.005 * (currentScrollPos - triggerOffset));
  
        // Verifica si es un dispositivo móvil
        if (window.innerWidth < 768) {
          // Aplica un escalado del 50% si es un dispositivo móvil
          scale = Math.min(20, 0.5 + 0.001 * (currentScrollPos - triggerOffset));
        }
  
        // Aplica la transformación de escala al elemento
        elementToTransform.style.transform = 'scale(' + scale + ')';
  
        // Aplica estilos de desbordamiento al contenedor del título
        titleContainer.style.overflow = 'hidden';
      } else {
        // Si no se cumple la condición, restablece la escala y el desbordamiento
        elementToTransform.style.transform = 'scale(1)';
        titleContainer.style.overflow = 'visible';
      }
  
      // Actualiza la posición anterior del scroll
      prevScrollPos = currentScrollPos;
    });
  });



//menu hamburger

  const menu = document.querySelector(".menu");
  const menuItems = document.querySelectorAll(".menuItem");
  const hamburger = document.querySelector(".hamburger");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");
  
  function toggleMenu() {
    // Alternar la clase "showMenu" en el elemento del menú
    menu.classList.toggle("showMenu");
    
    // Mostrar u ocultar los íconos según el estado del menú
    closeIcon.style.display = menu.classList.contains("showMenu") ? "block" : "none";
    menuIcon.style.display = menu.classList.contains("showMenu") ? "none" : "block";
  }
  
  // Agregar un evento de clic al ícono del menú hamburguesa
  hamburger.addEventListener("click", toggleMenu);
  
  // Agregar eventos de clic a cada elemento del menú para cerrar el menú al hacer clic
  menuItems.forEach(menuItem => menuItem.addEventListener("click", toggleMenu));


