const searchBtn = document.querySelector('.header-content-inner-list-item-link.search-btn')
const searchBox = document.querySelector('.header-content-inner-list-item-search')

searchBtn.addEventListener('click', (event) => {
    event.preventDefault()

    if(searchBox.classList.contains('show')){
        searchBtn.innerHTML = '<i class="fas fa-search"></i>'
    }
    else{
        searchBtn.innerHTML = '<i class="fas fa-times"></i>'
    }

    searchBox.classList.toggle('show')

})