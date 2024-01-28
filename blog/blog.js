// MODULES DE BLOG (EFFET ACCORDÉON)

// sélection de tous les éléments ayant la classe "accordion"
var acc = document.getElementsByClassName("accordion");
    var i;
    // parcourt de tous les éléments "accordion" et ajout d'un gestionnaire d'évènements de click à chacun d'eux
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          // ajouter ou retirer la classe "active" au bouton cliqué
          this.classList.toggle("active");
          // ajouter ou retirer la classe "active" au parent du bouton (élément contenant le panneau)
          this.parentElement.classList.toggle("active");
          // sélection du panneau suivant au bouton cliqué
          var pannel = this.nextElementSibling;

          // si le panneau est actuellement affiché, le bloquer
          if (pannel.style.display === "block") {
            pannel.style.display = "none";
          } else { // si le panneau est actuellement masqué, l'afficher
            pannel.style.display = "block";
          }
    });
}
