const result = document.querySelector('.result');
const recap = document.querySelector('.recap');

let price = '';

let commande = JSON.parse(localStorage.getItem("commande"));
let total = JSON.parse(localStorage.getItem("total"));
if(commande == null){
  result.innerHTML += `<p>
    Vous n'avez pas de commande en cours!
  </p>`;;
}else{

  result.innerHTML += `<div>
    <p>
      Merci <span>${commande.contact.firstName} ${commande.contact.lastName}</span> d'avoir passer votre commande.</br>
      Votre numéro de commande est le : </br><span>${commande.orderId}</span>.</br>
    </p>
  </div>`;


    let product = '';

    for(let i = 0; i < commande.products.length; i++){
      product += `
        <tr>
          <td><img src="${commande.products[i].imageUrl}" width="50px" heigth="50px"></td>
          <td>${commande.products[i].name} </td>
        </tr>`;
      };

      recap.innerHTML += `<h2>Récapitulatif de votre commande : </h2>
      <table class="newPanier">
        <tr>
          <th>Image</th>
          <th>Nom du produit</th>
        </tr>
        ${product}
        <tr>
          <td>Total</td>
          <td>${total} €</td>
        </tr>

      </table>`;




  localStorage.removeItem("commande");
  localStorage.removeItem("woods");
  localStorage.removeItem("total");

}
