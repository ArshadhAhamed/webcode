const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('makeupkit');
const mealDetailsContent = document.querySelector('.makeupkit-details-content');
const recipeCloseBtn = document.getElementById('makeupkit-close-btn');

// event listeners
searchBtn.addEventListener('click', getMakeupkitList);
MakeupList.addEventListener('click', getMakeupkit);
makeupCloseBtn.addEventListener('click', () => {
    makeupDetailsContent.parentElement.classList.remove('showmakeupkit');
});


// get Makeup list that matches with your search
function MakeupkitList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.makeupkit){
            data.makeupkit.forEach(makeupkit => {
                html += `
                <div class = "makeupkit-item" data-id = "${makeupkit.idmakeupkit}">
                <div class = "makeupkit-img">
                    <img src = "${makeupkit.strMealThumb}" alt = "makeupkit">
                </div>
                <div class = "makeupkit-name">
                    <h3>${makeupkit.strMakeupkit}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
            </div>
        `;
                `;
            });
            MakeupkitList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            MakeupkitList.classList.add('notFound');
        }

        MakeupkitList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}