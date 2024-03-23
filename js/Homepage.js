if (!localStorage.getItem("isAuthenticated")) {
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
}

if(localStorage.getItem("isAuthenticated")=="true"){
    var content =document.getElementById('logorreg');
    
    var userName = localStorage.getItem("userName");

    content.innerHTML = `
    <div class="dropdown">
<span class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Hi, ${userName}!
</span>

<ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Profile</a></li>
    <li><a class="dropdown-item" onclick="logout()">Sign out</a></li>
</ul>
</div>
    `;

}



function showDropdownLinks(elementID, expand) {

    let hiddenContent;
    if (expand) {
        switch (elementID) {
            case 'savedIcon'      : 
                                let content = document.getElementById('savedIcon');
                                console.log("flag");
                            if (count){

                                hiddenContent = document.getElementById('savedIcon');
                                hiddenContent.style.display = 'block';
                            }
                            break;

            case 'electronicsIcon':
                            hiddenContent = document.getElementById('electronicsIcon');
                            hiddenContent.style.display = 'block';
                            break;

            case 'motorIcon'      :
                            hiddenContent = document.getElementById('motorIcon');
                            hiddenContent.style.display = 'block';
                            break;

            case 'fashionIcon'      :
                            hiddenContent = document.getElementById('fashionIcon');
                            hiddenContent.style.display = 'block';
                            break;
                        
            case 'collectiblesIcon'      :
                            hiddenContent = document.getElementById('collectiblesIcon');
                            hiddenContent.style.display = 'block';
                            break;

            case 'sportsIcon'      :
                            hiddenContent = document.getElementById('sportsIcon');
                            hiddenContent.style.display = 'block';
                            break;
                        
            case 'healthIcon'      :
                            hiddenContent = document.getElementById('healthIcon');
                            hiddenContent.style.display = 'block';
                            break;

            case 'industrialIcon'      :
                            hiddenContent = document.getElementById('industrialIcon');
                            hiddenContent.style.display = 'block';
                            break;

            case 'homeGardenIcon'      :
                            hiddenContent = document.getElementById('homeGardenIcon');
                            hiddenContent.style.display = 'block';
                            break;

            // case 'dealsIcon'      :
            //                 hiddenContent = document.getElementById('dealsIcon');
            //                 hiddenContent.style.display = 'block';
            //                 break;
                            
            case 'sellIcon'      :
                            hiddenContent = document.getElementById('sellIcon');
                            hiddenContent.style.display = 'block';
                            break;
            
            // case 'countryDropdown'      :
            //                 hiddenContent = document.getElementById('countryDropdown');
            //                 hiddenContent.style.display = 'block';
            //                 break;
        }

    } else {
        let hiddenContent = document.getElementById(elementID);
            hiddenContent.style.display = 'none';

    }
}

function languages( elementID, expand){

    if(expand){
    hiddenContent = document.getElementById('countryDropdown');
    hiddenContent.style.display = 'block';
    } else{
    hiddenContent = document.getElementById('countryDropdown');
    hiddenContent.style.display = 'none';
    }
}

// function hideDropdownLinks(elementID){
//     let hiddenContent = document.getElementById(elementID);
//     hiddenContent.style.display = 'none';
// }

// function buttonHover(elementID, state) {
//     let button = document.getElementById(elementID);
//     if (button) {
//         if (state) {
//             switch (elementID){
//                 case 'firstSlideBtn':
//                     button.style.backgroundColor ='brown';
//                     break;
//                 case 'secondSlideBtn':
//                     button.style.backgroundColor ='blue';
//                     break;
//                 case 'thirdSlideBtn':
//                     button.style.backgroundColor ='white';
//                     break;
//             }
//         } else {
//             button.style.backgroundColor = 'transparent';
//         }
//     }
// }



$.ajax({
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
    success: function(response) {
        // Sort countries by population (descending)
        response.sort((a, b) => b.population - a.population);
        
        // Get the top 20 countries
        let topCountries = response.slice(0, 20);

        // Divide countries into four lists
        let columns = [[], [], [], []];
        topCountries.forEach((country, index) => {
            columns[index % 4].push(country);
        });

        // Populate the dropdown menu with the top countries
        let dropdownMenu = $('#countryDropdown');
        columns.forEach(column => {
            let list = $('<ul>').addClass('dropdown-column').appendTo(dropdownMenu).css('display', 'inline-block');
            column.forEach(country => {
                let listItem = $('<li>').appendTo(list);
                let link = $('<a>').addClass('dropdown-item').attr('href', '#').appendTo(listItem);
                $('<img>').attr('src', country.flags.png).css({'width': '50px', 'height': '50px'}).appendTo(link);
                $('<span>').text(country.name.common).appendTo(link);
            });
        });
        
    },
    error: function(xhr, status, error) {
        console.error('Error fetching countries:', error);
    }
});



let count=0; //number of items on savedIcon

function saveItem(elementId, elementImgId, elementInfoId) {
    let elementImage = document.getElementById(elementImgId).getAttribute('src');
    let elementInfo = document.getElementById(elementInfoId).innerText;
    let savedItems = document.getElementById('savedIcon');
    
    // Define itemIdVar outside the switch block
    let itemIdVar;

    switch (elementId) {
        case 'campus':
            itemIdVar = 101;
            break;
        case 'dyson':
            itemIdVar = 102;
            break;
        case 'ecoflow':
            itemIdVar = 103;
            break;
        case 'laptop':
            itemIdVar = 104;
            break;
        case 'crocs':
            itemIdVar = 105;
            break;
        case 'iphone':
            itemIdVar = 106;
            break;
    }
    
    let existingItem = savedItems.querySelector(`#${elementId}-data`);

    if (!existingItem) {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', elementImage);
        imgElement.setAttribute('alt', '');
        imgElement.setAttribute('style', 'width: 100px; height: 100px; display: inline-block;');
        imgElement.setAttribute('href', '#');

        let infoElement = document.createElement('p');
        infoElement.innerText = elementInfo;
        infoElement.setAttribute('style', 'display: inline-block;');

        let block = document.createElement('div');
        block.setAttribute('class', 'row');
        block.setAttribute('href', '#');
        block.setAttribute('id', `${elementId}-data`);

        // Concatenate itemIdVar into the function call properly
        block.setAttribute('onclick', `fetchFeaturedProductData(${itemIdVar})`);

        block.appendChild(imgElement);
        block.appendChild(infoElement);

        document.getElementById("savedIcon").appendChild(block);

        count++;
    } else {
        existingItem.remove();
        count--;
    }
}



function heartFunction(elementId, elementImgId, elementInfoId) {
    let heart = document.getElementById(elementId);

    saveItem(elementId, elementImgId, elementInfoId);

    if (heart.querySelector('path').getAttribute('fill') == '#fffffff4' ) {
        heart.querySelector('path').setAttribute('fill', '#ff0000bd');
        

    } else {
        heart.querySelector('path').setAttribute('fill', '#fffffff4');
        
    }
    
    

}









// // Mapping of countries to languages
// const countryToLanguage = {
//     'United States': 'en', // English
//     'Germany': 'de', // German
//     // Add more mappings as needed
// };

// // Function to translate website content
// function translateWebsite(language) {
//     // Change the website language
//     if (typeof googleTranslateElementInit == 'function') {
//         new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: [language], layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
//     }
// }

// // Event listener for country selection
// $(document).on('click', '.dropdown-item', function() {
//     // Get the selected country
//     let selectedCountry = $(this).find('span').text();

//     // Determine the corresponding language
//     let language = countryToLanguage[selectedCountry];

//     // Translate website content
//     translateWebsite(language);
// });




// <------- sending data through url------->

// function sendProductDetails(){

//     var product = {
//         name: "Product Name",
//         price: "$100",
//         description: "Product Description"
//         // Add more details as needed
//     };
    
//     // Convert to JSON
//     var productJSON = JSON.stringify(product);
    
//     // Redirect to the next page with JSON data as a URL parameter
//     window.location.href = "nextpage.html?product=" + encodeURIComponent(productJSON);


// <---------the code that must be in the next page----------->
//     var urlParams = new URLSearchParams(window.location.search);
// var productJSON = urlParams.get('product');

// // Parse JSON data
// var product = JSON.parse(decodeURIComponent(productJSON));

// // Display product details
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('productName').innerText = product.name;
//     document.getElementById('productPrice').innerText = product.price;
//     document.getElementById('productDescription').innerText = product.description;
//     // Display more details as needed
// });
// }

function fetchFeaturedProductData(productId) {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        
        const product = data['featured products'].product.find(item => item.id === productId);
        if (product) {
        // console.log(product);
        
        window.location.href = `pages/ProductDetails.html?id=${productId}`;
        } else {
        console.error('Product not found');
        }
    })
    .catch(error => console.error('Error fetching product data:', error));
}

function fetchCategory(categoryId) {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        
        const category = data['categories'].category.find(item => item.id === categoryId);
        if (category) {
        // console.log(category.name);
        
        window.location.href = `pages/productList.html?category=${category.name}`;
        } else {
        console.error('Category not found');
        }
    })
    .catch(error => console.error('Error fetching Category data:', error));
}

function login(){
    window.location.href = `pages/login.html`
}

function logout(){
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
    localStorage.clear();
    window.location.href = `index.html`
}

function register(){
    window.location.href = `pages/register.html`
}


function homepage(){
    window.location.href = `index.html`
}