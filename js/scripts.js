'use strict';
//This program pulls Chuck Norris quotes from an API and updates the page content

document.addEventListener('DOMContentLoaded', function() {
    const chuckQuote = document.getElementById('chuckQuote');
    const getNewQuote = document.querySelector('button');
    const defaultCategory = 'science';
    let currentCategory = defaultCategory

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
        const filteredList = categoryData.filter(category => {
            if (category !== 'explicit' && category !== 'political' && category !== 'religion') {
                return category;
            }
        })
        const categoryListForm = document.querySelector('#categoryList');
        const selectElement = document.createElement('select');
        filteredList.forEach(function(category) {
            const categoryOptionElement = document.createElement('option');
            categoryOptionElement.value = category;
            categoryOptionElement.text = category;
            if (category === currentCategory) {
                categoryOptionElement.setAttribute('selected', true);
            };
            selectElement.appendChild(categoryOptionElement);
        });
        categoryListForm.appendChild(selectElement);
    
        selectElement.addEventListener('change', function (event) {
            const categoryName = event.target.value;
            currentCategory = categoryName
            fetchQuote(currentCategory);
        })
    }
    function updateQuote(data) {
        chuckQuote.innerText = data.value;
    }
    getNewQuote.addEventListener('click', function() {
        fetchQuote(currentCategory);
    })
    fetchQuote(currentCategory)
    fetchCategories()
});













