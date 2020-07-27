
// Récupération des éléments du DOM
const result = document.querySelector('.result');
const recap = document.querySelector('.recap');

// Création des variables
let price = '';
let product = '';
let quantite = 0;
let woods = JSON.parse(localStorage.getItem("woods"));
let commande = JSON.parse(localStorage.getItem("commande"));
let total = JSON.parse(localStorage.getItem("total"));


if(commande == null){
  result.innerHTML += `<p>
    Vous n'avez pas de commande en cours!
  </p>`;;
}else{

  //Affichage de la confirmation de commande
  result.innerHTML += `<div>
    <p>
      Merci <span>${commande.contact.firstName} ${commande.contact.lastName}</span> d'avoir passer votre commande.</br>
      Votre numéro de commande est le : </br><span>${commande.orderId}</span>.</br>
    </p>
  </div>`;

  // Affichage des produits reçu en réponse du serveur
  for(let i = 0; i < commande.products.length; i++){
    console.log(commande.products[i]._id);
    for(let p = 0; p < woods.length; p++){
      if(woods[p]._id == commande.products[i]._id){
        quantite = woods[p].quantite;
      }
    }
      product += `
        <tr>
          <td><img src="${commande.products[i].imageUrl}" class="img"></td>
          <td>${commande.products[i].name} </td>
          <td>${quantite}</td>
        </tr>`;
      };

      recap.innerHTML += `<h2>Récapitulatif de votre commande : </h2>
      <table class="newPanier">
        <tr>
          <th>Image</th>
          <th>Nom du produit</th>
          <th>Quantité</th>
        </tr>
        ${product}
        <tr>
          <td colspan="2">Total</td>
          <td>${total} €</td>
        </tr>

      </table>`;



  // Suppression des éléments dans le localStorage après affichage de la confirmation
  localStorage.removeItem("commande");
  localStorage.removeItem("woods");
  localStorage.removeItem("total");

}
