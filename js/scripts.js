'use strict';
//This program pulls Chuck Norris quotes from an API and updates the page content

//XHR request format

// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         console.log(this.response)
//     }
// };
// request.open('GET', "https://api.chucknorris.io/jokes/random?category=dev");
// request.send();
// console.log("Request is: ", request)


//Fetch format

const chuckQuote = document.getElementById('chuckQuote');
const getNewQuote = document.querySelector('button');

function fetchQuote(category){
    fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
    ).then((response) => {
        return response.json();
    }).then((data) => {
        updateQuote(data)
    })
}

function fetchCategories() {
    fetch(
        "https://api.chucknorris.io/jokes/categories"
    ).then((response) => {
        return response.json();
    }).then((data) => {
        updateCategories(data);
    })
}

function updateCategories(categoryData) {
    const categoryListForm = document.querySelector('#categoryList');
    const selectElement = document.createElement('select');
    selectElement.append(defaultOption);
    categoryData.forEach(function(category) {
        const categoryOptionElement = document.createElement('option');
        categoryOptionElement.value = category;
        categoryOptionElement.text = category;
        selectElement.appendChild(categoryOptionElement);
    })
    categoryListForm.appendChild(selectElement);

    selectElement.addEventListener('change', function (event) {
        const categoryName = event.target.value;
        fetchQuote(categoryName)
    })
}

function updateQuote(data) {
    chuckQuote.innerText = data.value;
}

getNewQuote.addEventListener('click', function() {
    fetchQuote();
})

fetchQuote();
fetchCategories()