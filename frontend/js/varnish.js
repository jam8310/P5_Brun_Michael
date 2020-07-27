// fonction pour la création du vernis dans le localStorage
const items = ()=>{

  let total = '';
  let items = [];
  let woods = JSON.stringify(items);

  localStorage.setItem ("woods", woods);
  localStorage.setItem ("total", total);

}

if(localStorage.woods == undefined){

  items();

}
