class RecipeFactory {
    constructor(recipes) {
        this.recipes = recipes
    }

    createRecipeCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('recipes')


        const recipeCard = 
        `
			<div class="recipes_top"></div>
			<div class="recipes_bottom">
				<div class="recipes_bottom-title">
					<h2>${this.recipes.name}</h2>
					<div class="recipes_bottom-title--time">
						<i class="fa-solid fa-magnifying-glass"></i>
						<p>${this.recipes.time}min</p>
					</div>			
				</div>

				<div class="recipes_bottom-details">
					<div class="recipes_bottom-details--txt">
						${this.recipes.ingredients.map((ingredient)=>{					
							return `<p>${ingredient.ingredient}: ${ingredient.quantity||""} ${ingredient.unit||""}</p>`;	
						}).join("")}
					</div>
					<div class="recipes_bottom-details--txt description">
						<p>${this.recipes.description}</p>
					</div>
				</div>
			</div>
        `
        wrapper.innerHTML = recipeCard
        return wrapper
    }
}

function displayRecipes(recipes) {
    const recipesWrapper = document.querySelector('.recipes-container')
	recipesWrapper.innerHTML = ""

    recipes.forEach((recipe) => {
		recipesWrapper.appendChild(new RecipeFactory(recipe).createRecipeCard())
    }) 	
}

let tabIngredients;
let tabUstensiles;
let tabAppareils;


// CREATION DES LISTES INGREDIENTS, APPAREILS ET USTENSILES

function createList(recipes) {
    let tabIngredients = [];
    let tabUstensiles = [];
    let tabAppareils = [];

	/*tabIngredients = [...new Set];
    tabUstensiles = [...new Set];
    tabAppareils = [...new Set];*/

    recipes.forEach(recette => {
        recette.ingredients.forEach((ingredient) => {
            tabIngredients.push(ingredient.ingredient);
        });
		
        recette.ustensils.forEach((ustensile) => {
            tabUstensiles.push(ustensile);
        });
        tabAppareils.push(recette.appliance);
    });

    // Suppression des doublons   
    tabIngredients = [...new Set (tabIngredients)].sort();
    tabUstensiles = [...new Set (tabUstensiles)].sort();
    tabAppareils = [...new Set (tabAppareils)].sort();

	// faire fonction qui prend en paramètre les différents selecteurs

/*
	const listeIngredients = document.querySelector(".liste.ingredients");
	listeIngredients.innerHTML = "";

	tabIngredients.forEach((ingr) => {
		const p = document.createElement("p");
		p.innerHTML = ingr;
		listeIngredients.appendChild(p);
	})

	const listeAppareils = document.querySelector(".liste.appareils");
	listeAppareils.innerHTML = "";

	tabAppareils.forEach((app) => {
		const p = document.createElement("p");
		p.innerHTML = app;
		listeAppareils.appendChild(p);
	})

	const listeUstensiles = document.querySelector(".liste.ustensiles");
	listeUstensiles.innerHTML = "";

	tabUstensiles.forEach((ust) => {
		const p = document.createElement("p");
		p.innerHTML = ust;
		listeUstensiles.appendChild(p);
	})

	*/
}

function creaListeDom(tabTag, id){
    //........je crée un UL et des LI generique.............
    const divListe = document.getElementById(id + "_div");
	console.log(divListe)
    divListe.innerHTML = "";

	const ul = document.createElement("ul");
    ul.id = id;
    console.log(ul.id)

    divListe.appendChild(ul);

    tabTag.forEach(e => {

        const li = document.createElement("li");
        li.className = "li_" + id;
        li.innerHTML = e;
        ul.appendChild(li)
    });

}

function displayListe(recipes){
	createList(recipes)
	creaListeDom(tabIngredients, "ingredients");
    creaListeDom(tabAppareils,  "appareils");
    creaListeDom(tabUstensiles,  "ustensiles");
}
    

displayListe(recipes)



/*

function creaListeDom(id){

	const divListe = document.getElementById(id + "_div")
	//divListe.innerHTML = "";
	console.log(divListe)



	/*liste.forEach((list) => {
		const dataType = list.getAttribute("data-type")
		const divListe = document.querySelector(`.liste.${dataType}`);
		divListe.innerHTML = "";	

		console.log(list)

		list.innerHTML = ""

		const p = document.createElement("p");
		p.className = `.p_${dataType}`
		p.innerHTML = tabIngredients
		list.appendChild(p);

		
	})  
}

*/

const divListeIng = document.getElementById("ingredients_div");
const divListeApp = document.getElementById("appareils_div");
const divListeUst = document.getElementById("ustensiles_div");




///////////////////////////////////////////////////////
//    OUVERTURE ET FERMETURE DES BOUTONS             //
///////////////////////////////////////////////////////



var openBtn = Array.from(document.querySelectorAll('.btn'))

openBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.stopPropagation()
		const dataType = e.target.getAttribute("data-type")
		const liste = document.querySelector(`.liste.${dataType}`);
		liste.classList.toggle("active")
		btn.classList.toggle("active")
		btn.lastElementChild.classList.toggle("active")
	})
})






// CREATION DES TAGS

var sectionTag = document.querySelector(".section-tag");
const listeIngredients = document.querySelector(".liste.ingredients");

function createTag(e){
    const tag = document.createElement("div");
	tag.className = "tag"
	tag.id = `tag_${e.target.textContent}`;

	const spanTag = document.createElement("span");
    spanTag.className = "text"
	spanTag.innerHTML = e.target.textContent;

    const closeIcon = document.createElement("i");
    closeIcon.className = "far fa-times-circle";
    closeIcon.id = `close_${e.target.textContent}`;
    closeIcon.onclick = closeTag;

    
	tag.appendChild(spanTag)
	tag.appendChild(closeIcon)
    sectionTag.appendChild(tag);
}

listeIngredients.addEventListener("click", (e)  => {
    createTag(e); 
});

function closeTag(e){
    sectionTag.removeChild(e.target.parentNode);
}




var recettes = recipes;


/*var tabIng = [];


function filtreTag(){
    tabIng = [];

    Array.from(sectionTag.children).forEach(e => {
        if(e.children[0].className == "text"){
            tabIng.push(e.children[0].textContent.toLowerCase());
        }
    })


    if (sectionTag.childElementCount > 0){ 

        let resultatTag = recipes.filter(recette => {  //je parcours les recettes
            return (                                //et je retourne, la comparaison entre les tableaux et les recettes
                tabIng.every(ing => recette.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(ing)))
                
            )    
        });

        recettes = resultatTag;
    }
    else{
        resultatTag = recettes;
    }
    displayRecette(recettes);
    displayListe(recettes);
}

function displayListe () {
    createList(recipes);

}

*/





const recipesWrapper = document.querySelector('.recipes-container')

function displayRecette(recettes) {
    recipesWrapper.innerHTML = "";

    recettes.forEach(recette => {
        recipesWrapper.appendChild(new RecipeFactory(recette).createRecipeCard())
    });
}



///////////////////////////////////////////////////////
//    FILTRE BARRE DE RECHERCHE                      //
///////////////////////////////////////////////////////


const barreChamp = document.querySelector(".search_bar")


function filtreBarre(){
    const inputBarre = barreChamp.value;
    let resultat = [];

    if(inputBarre.length >= 3){    //filtre des recettes en relation avec les caractères tapés  

        resultat = recettes.filter(recette => recette.name.toLowerCase().includes(inputBarre.toLowerCase()) || 
			recette.description.toLowerCase().includes(inputBarre.toLowerCase()) || 
			recette.ingredients.some ((ingredient) => 
			ingredient.ingredient.toLowerCase().includes(inputBarre.toLowerCase())));

        recettes = resultat; 
        
    }
	else{      //sinon affiche toutes les recettes avec un filtre correspondant aux tags selectionnes

        recettes = recipes;
        //filtreTag();
        resultat = recettes;

    }
    if(resultat.length == 0){ 
        noRecipes();
    }
	else{

        displayRecette(resultat);   //j'affiche le resultat de ce filtre au niveau des recettes
    }

    //displayListe(resultat);     //j'affiche le resultat de ce filtre au niveau des listes btn
    
}

barreChamp.addEventListener("input", filtreBarre);



function noRecipes(){
    recipesWrapper.innerHTML = "";

    const recipesNull = document.createElement("div");
    recipesNull.className = "recipes-container--null";
    recipesNull.textContent = "Aucune recette ne correspond à votre recherche."
    recipesWrapper.appendChild(recipesNull);
}





function init(){
	displayRecipes(recipes)	
	createList(recipes)
}

init()

