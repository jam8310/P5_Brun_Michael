
// Chargement du localStorage
let woods = JSON.parse(localStorage.getItem("woods"));

// Récupération des éléments du DOM
const panier = document.querySelector('.panier');
const form = document.querySelector('.form');
const contact = document.querySelector('.contact');


// Création des variables
let total = 0;
let product = '';
let products = [];

if(woods == null || woods == ''){
  panier.innerHTML = "Votre Panier est vide ! ";
  saveTotal();
  contact.innerHTML = '';
}else{

    chargement();
    saveTotal();

    const btnMoins = document.querySelectorAll(".btnMoins");
    const btnPlus = document.querySelectorAll(".btnPlus");

    // Evenement appuie sur moins dans quantité
    for(let i =0; i < btnMoins.length; i++){
      btnMoins[i].addEventListener("click", ()=>{
        quantite(btnMoins[i]);
      });
    }

    // Evenement appuie sur plus dans quantité
    for(let i =0; i < btnPlus.length; i++){
      btnPlus[i].addEventListener("click", ()=>{
        quantite(btnPlus[i]);
      });
    }

    // FORMULAIRE


    // Evenement dès l'envoie du formulaire
    form.addEventListener('submit', (e)=>{
      e.preventDefault();

      let data = {
        contact : {
        firstName : e.target.elements.firstName.value,
        lastName : e.target.elements.lastName.value,
        address : e.target.elements.address.value,
        city : e.target.elements.city.value,
        email : e.target.elements.email.value,
        },
        products
      }

      if(checkValue(data.contact) == true){
        let url = 'http://localhost:3000/api/furniture/order';
        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type" : "application/json"
          },
        })
        .then(res => res.json())
        .then(res =>{
          console.log(res);
          let commande = JSON.stringify(res)
          localStorage.setItem("commande", commande);
          location.href = "./confirmation.html";
        })
      }

    });

}


// Fonctions

  //Affiche tous les produits présent dans le localStorage
  function chargement(){
  for(let i = 0; i < woods.length; i++){

        product += `<tr>
            <td><a href="./produit.html?id=${woods[i]._id}"><img src="${woods[i].url}" width="50px" heigth="50px"></a></td>
            <td>${woods[i].name} </td>
            <td> <button class="btnPlus" name="btnPlus" id="${woods[i]._id}"> + </button> ${woods[i].quantite} <button class="btnMoins" name="btnMoins" id="${woods[i]._id}"> - </button></td>
            <td>${woods[i].newPrice}</td>
          </tr>`;
          total += woods[i].newPrice;
          products.push(woods[i]._id);
  }

  if(woods.length != 0){
    panier.innerHTML += `<table class="newPanier">
      <tr>
        <th>Image</th>
        <th>Nom du produit</th>
        <th>Quantité</th>
        <th>Prix</th>
      </tr>
      ${product}
      <tr>
        <td colspan="3"><b>Total</b></td>
        <td><b>${total}</b></td>
      </tr>
    </table>`;
  }else{
    panier.innerHTML = "Votre Panier est vide ! ";
  }
}

  // Modifie la quantité selon l'appuie sur le bouton + ou -
  function quantite(btn) {

    let name = btn.name;
    let id = btn.id;

    for(let i =0; i< woods.length;i++){

      if(woods[i]._id == id){
        let quantite = woods[i].quantite;
        let position = woods[i];
        let price = woods[i].price;


        if(name == "btnMoins"){
          quantite--;

          if(quantite == 0){

            //On supprime l'element
            let del = woods.indexOf(position);
            let sup = woods.splice(del, 1);

            //On enregistre les modificatiions
            saveProduct();

            //On redirige
            location.href= "./panier.html";

          }else{

            //On met a jour l'element
            let del = woods.indexOf(position);
            woods[del].quantite--;
            calculNewPrice(del);

            //On enregistre les modifications
            saveProduct();

            //On redirige
            location.href= "./panier.html";
          }
        }

        if(name == "btnPlus"){

          //Modifie les valeurs
          let del = woods.indexOf(position);
          woods[del].quantite ++;
          calculNewPrice(del);

          //Enregistre les modifications
          saveProduct();

          // Redirection

          location.href= "./panier.html";
        }

      }
    }
  }

  // Enregistre les modifications dans le localStorage
  function saveProduct(){
  let items = JSON.stringify(woods);
  localStorage.setItem("woods", items);
  }

  // Calcul price product
  function calculNewPrice(position){
    let newPrice = woods[position].price * woods[position].quantite;
    woods[position].newPrice = newPrice;
  }

  // Enregistre le total dans le localStorage
  function saveTotal(){
    let totals = JSON.stringify(total);
    localStorage.setItem("total", totals);
  }

  // Formulaire

  // fonction vérifie sur les entrées sur les inputs sont bon
  function checkValue(data){
    const error = document.querySelector('.error');
    error.innerHTML = '';
    //[^0-9a-zA-Z *]
    let regex = /[~`!#$%\^&*+=\-\[\]\';,/{}|\":<>\?0123456789 ]/;
    let regexAddress = /[~`!#$%\^&*+=\-\[\]\';/{}|\":<>\?]/;

    if(data.firstName.match(regex) || data.lastName.match(regex) || data.address.match(regexAddress) || data.address == ' '  || data.city.match(regex))
    {
      error.innerHTML += 'Veuillez remplir correctement les champs avec des lettres';
      return false;
    }
    else{
        return true;
    }

  }
