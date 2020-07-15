
let woods = JSON.parse(localStorage.getItem("woods"));

const panier = document.querySelector('.panier');
const form = document.querySelector('.form');
const contact = document.querySelector('.contact');

let total = 0;
let product = '';
let products = [];

if(woods == null || woods == ''){
  panier.innerHTML = "Votre Panier est vide ! ";
  contact.innerHTML = '';
}else{



  function chargement(){
    for(let i = 0; i < woods.length; i++){

          product += `<tr>
              <td><a href="./produit.html?id=${woods[i]._id}"><img src="${woods[i].url}" width="50px" heigth="50px"></a></td>
              <td>${woods[i].name} </td>
              <td> <button class="btnPlus" id="${woods[i]._id}"> + </button> ${woods[i].quantite} <button class="btnMoins" id="${woods[i]._id}"> - </button></td>
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
    chargement();

    const btnPlus = document.querySelectorAll(".btnPlus");
    const btnMoins = document.querySelectorAll(".btnMoins");

    // Appuie sur moins dans quantité
    for(let i =0; i < btnMoins.length; i++){
      btnMoins[i].addEventListener("click", ()=>{
        let id = btnMoins[i].id;

        for(let i=0; i< woods.length;i++){
          if(woods[i]._id == id){
            let quantite = woods[i].quantite;
            console.log(quantite);
            quantite--;

            if(quantite == 0){
              let position;
              for(let i =0; i < woods.length; i++){
                if(woods[i]._id == id){
                  position = woods[i];
                }
              }

              let del = woods.indexOf(position);
              let sup = woods.splice(del, 1);

              let items = JSON.stringify(woods);
              localStorage.setItem("woods", items);

              location.href= "./panier.html";
            }else{
              let position;
              for(let i =0; i < woods.length; i++){
                if(woods[i]._id == id){
                  position = woods[i];
                }
              }

              let del = woods.indexOf(position);
              woods[del].quantite--;
              let newPrice = woods[del].price * woods[del].quantite;
              woods[del].newPrice = newPrice;

              let items = JSON.stringify(woods);
              localStorage.setItem("woods", items);

              location.href= "./panier.html";
            }

          }
        }

      });
    }

    // Appuie sur plus dans quantité
    for(let i =0; i < btnPlus.length; i++){
      btnPlus[i].addEventListener("click", ()=>{
        let id = btnPlus[i].id;

        // Récupère les élément dans le tableau
        for(let i = 0; i < woods.length; i++){
          if(woods[i]._id == id){
            let price = woods[i].price;
            let quantite = woods[i].quantite;
            let position;

            for(let i =0; i < woods.length; i++){
              if(woods[i]._id == id){
                position = woods[i];
              }
            }

            //Modifie les valeurs
            let del = woods.indexOf(position);
            woods[del].quantite ++;
            let newPrice = woods[del].price * woods[del].quantite;
            woods[del].newPrice = newPrice;

            //let sup = woods.splice(del, 1);

            //Enregistre les new valeurs
            let items = JSON.stringify(woods);
            localStorage.setItem("woods", items);

            // Redirection

            location.href= "./panier.html";
          }
        }




      });
    }


    // FORMULAIRE

    // fonction vérifie sur les entrées sur les inputs sont bon
    function checkValue(data)
    {
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


    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      //console.log("bloqué");
      //console.log(products);
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
        ajaxPost(url, data, callback, true);
      }

    });

    //fonction callback
    function callback(text){
      //console.log(text);
      let command = JSON.parse(text);
      console.log(command);
      let commande = JSON.stringify(command)
      localStorage.setItem("commande", commande);
      location.href = "./confirmation.html";
    }

    // Exécute un appel AJAX POST
    // Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
    // Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
    function ajaxPost(url, data, callback, isJson) {
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        if (isJson) {
            // Définit le contenu de la requête comme étant du JSON
            req.setRequestHeader("Content-Type", "application/json");
            // Transforme la donnée du format JSON vers le format texte avant l'envoi
            data = JSON.stringify(data);
        }
        req.send(data);
    }

}
