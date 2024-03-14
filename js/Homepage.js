function showDropdownLinks(elementID, expand) {

    let hiddenContent;
    if (expand) {
        switch (elementID) {
            case 'savedIcon'      : 
                            hiddenContent = document.getElementById('savedIcon');
                            hiddenContent.style.display = 'block';
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
        }

    } else {
        let hiddenContent = document.getElementById(elementID);
            hiddenContent.style.display = 'none';

    }
}

function languages( elementID, expand){
    var dropdownMenu = document.getElementById(elementID);
    var dropdownToggle = document.getElementById(elementID).previousElementSibling;

    if(expand){
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');  
    } else{
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }
}

function hideDropdownLinks(elementID){
    let hiddenContent = document.getElementById(elementID);
    hiddenContent.style.display = 'none';
}

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

        // Populate the dropdown menu with the top countries
        let dropdownMenu = $('#countryDropdown');
        topCountries.forEach(country => {
            let listItem = $('<li>').appendTo(dropdownMenu);
            let link = $('<a>').addClass('dropdown-item').attr('href', '#').appendTo(listItem);
            $('<img>').attr('src', country.flags.png).css({'width': '100px', 'height': '100px'}).appendTo(link);
            $('<span>').text(country.name.common).appendTo(link);
        });
    },
    error: function(xhr, status, error) {
        console.error('Error fetching countries:', error);
    }
});


function saveItem(elementId, elementImgId, elementInfoId) {
    
    let elementImage = document.getElementById(elementImgId).getAttribute('src');
    let elementInfo = document.getElementById(elementInfoId).innerText;
    let savedItems = document.getElementById('savedIcon');

    
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
        block.setAttribute('id', `${elementId}-data`);

        block.appendChild(imgElement);
        block.appendChild(infoElement);

        document.getElementById("savedIcon").appendChild(block);
    } else {


        existingItem.remove();


    }
    
}

function heartFunction(elementId, elementImgId, elementInfoId) {
    let heart = document.getElementById(elementId);
    let flag = saveItem(elementId, elementImgId, elementInfoId);

    if (heart.querySelector('path').getAttribute('fill') == '#fffffff4' &&  flag!=1 ) {
        heart.querySelector('path').setAttribute('fill', '#ff0000bd');
        

    } else {
        heart.querySelector('path').setAttribute('fill', '#fffffff4');
        
    }
    
    

}

