// HEADER NAV BAR

// Sélection de tous les boutons de dropdown dans le document
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
// Sélection de tous les éléments de dropdown dans le document
const dropdown = document.querySelectorAll(".dropdown");
// Sélection du bouton hamburger par son ID
const hamburgerBtn = document.getElementById("hamburger");
// Sélection de la barre de navigation par sa classe
const navMenu = document.querySelector(".menu");
// Sélection de tous les liens à l'intérieur des dropdowns
const links = document.querySelectorAll(".dropdown a");

/* Fonction qui permet de définir l'attribut "aria-expanded" à 
"false" pour tous les boutons de dropdown */
function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

// Fonction qui permet de fermer tous les menus dropdown  
function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

// Fonction pour basculer l'affichage du menu hamburger
function toggleHamburger() {
  navMenu.classList.toggle("show");
}

// Ajout d'un écouteur d'évènements "EventListener" à chaque bouton de dropdown 
dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Récupérer l'index du dropdown associé au bouton
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    // Sélection de l'élément du dropdown correspondant
    const dropdownElement = document.getElementById(dropdownIndex);

    // Basculement de la classe "active" pour afficher ou cacher le dropdown
    dropdownElement.classList.toggle("active");
    // Fermer les autres dropdowns sauf celui actuel
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    // Empêcher la propagation de l'évènement pour éviter la fermeture immédiate 
    e.stopPropagation();
    // Basculer la valeur de l'attribut "aria-expanded"
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// Fermer le dropdown lorsque les liens  à l'intérieur du dropdown sont cliqués
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// Fermer le dropdown lorsque l'utilisateur clique sur le document
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// Fermer le dropdown lorsque la touche "escape" est pressée
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

// Ajout d'un EventListener pour basculer le menu hamburger
hamburgerBtn.addEventListener("click", toggleHamburger);
