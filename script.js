  //////////////////////////////////////////////////////
 //        AFFICHER LES CARDS DES RECETTES           //
//////////////////////////////////////////////////////

const recipesWrapper = document.querySelector('.recipes-container')
let recipesChosenArray = recipes


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

function displayRecipes(ok) {
    recipesWrapper.innerHTML = "";
    ok.forEach((recipe) => {
		recipesWrapper.appendChild(new RecipeFactory(recipe).createRecipeCard())
    }) 	
}


  ////////////////////////////////////////////////////////////////////////////
 //        AFFICHER LES LISTES INGREDIENTS/APPAREILS/USTENSILES            //
////////////////////////////////////////////////////////////////////////////


let tabIngredients = [...new Set]
let tabAppareils = [...new Set]
let tabUstensiles = [...new Set]
/*let tabIngredients = new Set()
let tabUstensiles = new Set()
let tabAppareils = new Set()*/

const listeIngredients = document.querySelector(".liste.ingredients");
const listeAppareils = document.querySelector(".liste.appareils");
const listeUstensiles = document.querySelector(".liste.ustensiles");



function initLists(recipes) {
    listeIngredients.innerHTML = "";
    listeAppareils.innerHTML = "";
    listeUstensiles.innerHTML = "";
    tabIngredients = []
    tabAppareils = []
    tabUstensiles = []
    /*tabIngredients.clear()
    tabAppareils.clear()
    tabUstensiles.clear()*/

    recipes.forEach(recipe => {
        recipe.ingredients.forEach((ingredient) => {
            tabIngredients.push(ingredient.ingredient);
            //tabIngredients.add(ingredient.ingredient);
        });
		
        recipe.ustensils.forEach((ustensile) => {
            tabUstensiles.push(ustensile);
            //tabUstensiles.add(ustensile);
        });
        tabAppareils.push(recipe.appliance);
        //tabAppareils.add(recipe.appliance);
    });

    tabIngredients = [...new Set (tabIngredients)];
    tabUstensiles = [...new Set (tabUstensiles)];
    tabAppareils = [...new Set (tabAppareils)];

    createList(tabIngredients, listeIngredients)
    createList(tabAppareils, listeAppareils)
    createList(tabUstensiles, listeUstensiles)
} 

function createList(tags, container){
    Array.from(tags).sort().forEach((tag) => {
        const p = document.createElement("p");
        p.innerHTML = tag;
        container.appendChild(p);
    })
    
}




  //////////////////////////////////////////////////////
 //        OUVERTURE/FERMETURE DES BOUTONS           //
//////////////////////////////////////////////////////



var openBtn = Array.from(document.querySelectorAll('.btn'))

openBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const dataType = e.target.closest("button").getAttribute("data-type")
		const liste = document.querySelector(`.liste.${dataType}`);
		liste.classList.toggle("active")
		btn.classList.toggle("active")
		btn.lastElementChild.classList.toggle("active")  
	})
})





  //////////////////////////////////////////////////////
 //        CREATION DES TAGS                         //
//////////////////////////////////////////////////////



var sectionTag = document.querySelector(".section-tag");

function createTag(e){
    const tag = document.createElement("div");
	tag.className = "tag"

    /*
    tag.innerHTML = 
    `
        <span class="text">${e.target.textContent}</span>
        <i class="far fa-times-circle close-tag" id="close_${e.target.textContent}"></i>
    `
    */
    
    
	const spanTag = document.createElement("span");
    spanTag.className = "text"
	spanTag.innerHTML = e.target.textContent;

    const closeIcon = document.createElement("i");
    closeIcon.className = "far fa-times-circle close-tag";
    closeIcon.id = `close_${e.target.textContent}`;
    
	tag.appendChild(spanTag)
	tag.appendChild(closeIcon)
    sectionTag.appendChild(tag)

    return tag
}

//let tagsArrayIngredients = []
//let tagsArrayAppareils = []
let tagsArrayUstensiles = []
let tagsArrayIngredients = new Set()
let tagsArrayAppareils = new Set()
//let tagsArrayUstensiles = new Set()



const liste = Array.from(document.querySelectorAll(".liste"))
liste.forEach((i) => {
    i.addEventListener("click", (e) => {    
        const tag =  createTag(e) 
        const dataType = i.getAttribute("data-type")
        tag.setAttribute("data-type", `${dataType}`)
        tag.classList.add(dataType)

        if (dataType === "ingredients") {    
            //tagsArrayIngredients.push(tag.textContent)                       
            tagsArrayIngredients.add(tag.textContent) 
            console.log(tagsArrayIngredients)                          
        }
        if (dataType === "appareils") {                        
            tagsArrayAppareils.add(tag.textContent)    
            //tagsArrayAppareils.push(tag.textContent)  
            console.log(tagsArrayAppareils)           
        }
        if (dataType === "ustensiles") {               
            tagsArrayUstensiles.push(tag.textContent) 
            //tagsArrayAppareils.add(tag.textContent)      
            console.log(tagsArrayUstensiles)          
        }   
        closeTag()
        rerollCards()   
    })
})


function closeTag(){
    let tagsClose = document.querySelectorAll(".far.fa-times-circle.close-tag")
    tagsClose.forEach((closer) => {
        closer.addEventListener("click", () => {
            let tagValue = closer.parentElement.textContent.trim()

            let hasIngredients = tagsArrayIngredients.has(tagValue)
            let hasAppareils = tagsArrayAppareils.has(tagValue)
            //let hasUstensiles = tagsArrayUstensiles.has(tagValue)
            //let indexIngredients = tagsArrayIngredients.indexOf(tagValue)
            //let indexAppareils = tagsArrayAppareils.indexOf(tagValue)
            let indexUstensiles = tagsArrayUstensiles.indexOf(tagValue)

            if (hasIngredients) {
                tagsArrayIngredients.delete(tagValue)
                console.log(tagsArrayIngredients) 
            }
            if (hasAppareils) {
                tagsArrayAppareils.delete(tagValue) 
                console.log(tagsArrayAppareils) 
            }
            /*if (hasUstensiles) {
                tagsArrayUstensiles.delete(tagValue) 
                console.log(tagsArrayUstensiles) 
            }
            if (indexIngredients > -1) {
                tagsArrayIngredients.splice(indexIngredients, 1) // 2nd parameter means remove one item only
            }
            if (indexAppareils > -1) {
                tagsArrayAppareils.splice(indexAppareils, 1) // 2nd parameter means remove one item only
            }*/
            if (indexUstensiles > -1) {
                tagsArrayUstensiles.splice(indexUstensiles, 1) // 2nd parameter means remove one item only
            }
            closer.parentElement.remove()
            rerollCards()
        })
    })
}


function rerollCards() {
    if (tagsArrayIngredients.length === 0 && tagsArrayAppareils.length === 0 && tagsArrayUstensiles.length === 0) {
        displayRecipes(recipes)
    } 

    else {
        if (tagsArrayIngredients.length !== 0) {
            tagsArrayIngredients.forEach((tag) => {               
                recipesChosenArray = recipesChosenArray.filter((recipe) =>                
                    recipe.ingredients.some(ingredient =>                      
                        ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())                       
                    )               
                )
            })
        }

        if (tagsArrayAppareils.length !== 0) {
            tagsArrayAppareils.forEach((tag) => {
                recipesChosenArray = recipesChosenArray.filter((recipe) =>
                    recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                )
            })
        }

        if (tagsArrayUstensiles.length !== 0) {
            tagsArrayUstensiles.forEach((tag) => {
                recipesChosenArray = recipesChosenArray.filter((recipe) =>
                    recipe.ustensils.some(item =>
                        item.toLowerCase().includes(tag.toLowerCase())
                    )
                )
            })
        }

        displayRecipes(recipesChosenArray)
        initLists(recipesChosenArray)
    }
}



///////////////////////////////////////////////////////
//    FILTRE BARRE DE RECHERCHE                      //
///////////////////////////////////////////////////////


const barreChamp = document.querySelector(".search_bar")



function filtreBarrePrincipale() {
    barreChamp.addEventListener("input", () => {
        let inputValue = barreChamp.value
   
        if(inputValue.length >= 3){
            recipesChosenArray = recipes.filter(recette => recette.name.toLowerCase().includes(inputValue.toLowerCase()) || 
            recette.description.toLowerCase().includes(inputValue.toLowerCase()) || 
            recette.ingredients.some ((ingredient) => 
            ingredient.ingredient.toLowerCase().includes(inputValue.toLowerCase())))
                     
            displayRecipes(recipesChosenArray)
            initLists(recipesChosenArray)
        }
        
        contrario(inputValue)
    })   
}

const inputIngredients = document.querySelector(".input-ingredients");
const inputAppareils = document.querySelector(".input-appareils");
const inputUstensiles = document.querySelector(".input-ustensiles");


function filtreIngredients(){
    inputIngredients.addEventListener("input", () => {
        const inputBarre = inputIngredients.value;

        if(inputBarre.length >= 1){      
            recipesChosenArray = recipes.filter((recipe) =>                
                recipe.ingredients.some(ingredient =>                      
                    ingredient.ingredient.toLowerCase().includes(inputBarre.toLowerCase())                       
                )               
            )   
            console.log(recipesChosenArray)
            initLists(recipesChosenArray)     
            displayRecipes(recipesChosenArray)     
        }   

        contrario(inputBarre)              
    })
}

function filtreAppareils(){
    inputAppareils.addEventListener("input", () => {
        const inputBarre = inputAppareils.value;
        if (inputBarre.length >= 1) {
            recipesChosenArray = recipes.filter((recipe) =>
                recipe.appliance.toLowerCase().includes(inputBarre.toLowerCase())
            )
            console.log(recipesChosenArray)
            initLists(recipesChosenArray)     
            displayRecipes(recipesChosenArray)
        }
       
        contrario(inputBarre)
    })
}

function filtreUstensiles(){
    inputUstensiles.addEventListener("input", () => {
        const inputBarre = inputUstensiles.value;
        if (inputBarre.length >= 1) {
            recipesChosenArray = recipes.filter((recipe) =>
                recipe.ustensils.some(item =>
                    item.toLowerCase().includes(inputBarre.toLowerCase())
                )
            )
            console.log(recipesChosenArray)
            initLists(recipesChosenArray)     
            displayRecipes(recipesChosenArray)
        }
        
        contrario(inputBarre)      
    })    
}

filtreBarrePrincipale()
filtreIngredients()
filtreAppareils()
filtreUstensiles()



function contrario(value){
    if(value.length == 0){
        displayRecipes(recipes)
        initLists(recipes)
        console.log("c'est 0")
    }

    else if(recipesChosenArray.length == 0){  
        noRecipes();
    } 
}



function noRecipes(){
    let noRecipes = document.querySelector(".no-recipes")
    noRecipes.innerHTML = 
    `
        <div class="recipes-container--null">Aucune recette ne correspond à votre recherche.</div>
    `
}





function init(){
	displayRecipes(recipes)	
	initLists(recipes)
}

init()

