// fonction pour la création du vernis dans le localStorage
const items = ()=>{

  let items = [];
  let woods = JSON.stringify(items);

  localStorage.setItem ("woods", woods);

}

if(localStorage.woods == undefined){

  items();

}
