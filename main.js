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


function Products()=fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
.then((response) => {
  console.log(response);
  // use chaining by returning the promise
  return response.json(); // response.json() return a promise
})
.then((products) => {
    console.log(products)
})
