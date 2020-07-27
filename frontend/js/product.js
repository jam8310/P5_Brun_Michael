
//Récupère lien get
let link = location.href;

//récupère id
let woodId = link.split('=')[1];

let element = {};

//affichage du produit
fetch('http://localhost:3000/api/furniture')
.then(response => response.json())
.then(woodProduct => {
  const product = document.querySelector('#product');

  for(let i =0; i < woodProduct.length; i++){
    if(woodProduct[i]._id == woodId){
      element._id = woodProduct[i]._id;
      element.name = woodProduct[i].name;
      element.price = woodProduct[i].price / 100;
      element.url = woodProduct[i].imageUrl;
      product.innerHTML += `<form class="woodProduct">
        <div class="productName">${woodProduct[i].name}</div>
        <img class="productImage" src="${woodProduct[i].imageUrl}">
        <div class="productDescription"><h2>Description : </h2>${woodProduct[i].description}</div>
        <div class="productVanish"><h2>Vernis : </h2>
          <div class="error"></div>
          ${varnish(woodProduct[i].varnish)} </div>
        <div class="productPrice"><h2>Prix : </h2>${woodProduct[i].price/100} €</div>
        <div class="allBtn">
          <button class="btn"><a href="./index.html">Retour</a></button>
          <button class="btn" id="panier"><a href="./panier.html">Ajouter au panier</a></button>
        </form>` ;

    }
  }


  // Récupération des éléments du DOM
  const choix = document.querySelectorAll('.choix');
  const panier = document.querySelector('#panier');
  const modal = document.querySelector('#modal');


  let validChoix = "";

  // Evenement choix vernis
  for(let i = 0; i < choix.length;i++){
    choix[i].addEventListener("click", ()=>{
      validChoix = choix[i].value;
    });
  };

  // Evenement click sur ajouter au panier
  panier.addEventListener("click", (e)=>{
  e.preventDefault();

    if(validChoix == ""){
      const error = document.querySelector('.error');
      error.innerHTML = "Veuillez sélectionner un vernis!";
    }else{

      // Récupération du tableau dans le localStorage
      let woods = JSON.parse(localStorage.getItem("woods"));

      //Ajout du produit dans le localStorage
      if(woods.length == 0){
        ajoutProduct(woods);
        saveProduct(woods);

      }else{
        for(let i=0; i < woods.length; i++){
          if(woods[i]._id == element._id){
            woods[i].quantite++;
            woods[i].newPrice = woods[i].price * woods[i].quantite;
            saveProduct(woods);
            break;
          }else{
            ajoutProduct(woods);
            saveProduct(woods);
            break;
          }
        }
      }
    }
  });

});


// Fonctions

// Ajout de produit nouveau produit dans "woods"
function ajoutProduct(woods){
  woods.push({"_id": element._id, "name": element.name, "price": element.price, "newPrice": element.price, "quantite": 1, "url": element.url});
}

// Enregistre les changements apportés a "woods" sur le localStorage
function saveProduct(woods){
  let items = JSON.stringify(woods);
  localStorage.setItem("woods", items);
  modal.style.display = "block";
  panier.style.display = "none";
}

//fonction Récupère vernis du produit
const varnish = (wood) =>{
  let result = "";

  for(let i =0; i < wood.length; i++){
    result += `<div>
      <input type="radio" class="choix" id="${wood[i]}" name="varnish" value="${wood[i]}">
      <label for="${wood[i]}">${wood[i]}</label></br>
    </div>`;


  }

  return result;
}
