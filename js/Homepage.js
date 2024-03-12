
function showDropdownLinks(elementID, expand) {

    let hiddenContent;
    if (expand) {
        switch (elementID) {
            // case 'savedIcon'      : 
            //                 document.getElementById('electronicsIcon').innerHTML =``;
            //                 break;

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

            case 'dealsIcon'      :
                            hiddenContent = document.getElementById('dealsIcon');
                            hiddenContent.style.display = 'block';
                            break;
                            
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

function buttonHover(state){

}


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
            $('<a>').addClass('dropdown-item')
                    .attr('href', '#')
                    .html(`<img src="${country.flags.png}" alt="${country.name.common}"> ${country.name.common}`)
                    .appendTo(listItem);
        });
    },
    error: function(xhr, status, error) {
        console.error('Error fetching countries:', error);
    }
});