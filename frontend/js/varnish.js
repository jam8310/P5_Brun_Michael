// fonction pour la création du tableau dans le localStorage
const items = ()=>{

  // Créations des variables
  let total = 0;
  let items = [];

  // Enregistrment dans le localStorage
  let woods = JSON.stringify(items);
  localStorage.setItem ("woods", woods);
  localStorage.setItem ("total", total);

}


if(localStorage.woods == undefined){

  items();

}
