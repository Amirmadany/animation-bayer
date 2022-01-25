// search box
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

// header-top-items
const headerTopItem = document.querySelectorAll('.header-top-item.has-sub') 
const headerTopSubMenu = document.querySelector('.header-top-sub-menu')

headerTopItem.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault()

        headerTopSubMenu.classList.toggle('show')

        if(headerTopSubMenu.classList.contains('show')){
            headerTopSubMenu.querySelector('.content').style.opacity = '0'

            headerTopSubMenu.style.height = 'auto'
            headerTopSubMenu.style.minHeight = '25rem'

            const maxHeight = headerTopSubMenu.offsetHeight;
            let height = maxHeight / 100
            
            headerTopSubMenu.style.height = '0'
            headerTopSubMenu.style.minHeight = '0'

            let time = setInterval(increaseHeigth, 1)

            function increaseHeigth(){
                height += 10;
                headerTopSubMenu.style.height = `${height}px`
                
                if(height >= maxHeight){
                    clearInterval(time)
                    time = null
                    setTimeout(() => {
                        headerTopSubMenu.querySelector('.content').style.opacity = '1'
                    }, 50)
                }

            }
                
        }

        else {
            let height = headerTopSubMenu.style.height.slice(0, headerTopSubMenu.style.height.length - 2);
            headerTopSubMenu.querySelector('.content').style.opacity = '0'

            headerTopSubMenu.classList = 'header-top-sub-menu ps-5 d-block'

            let time = setInterval(subtractHeigth, 1)

            function subtractHeigth(){
                height -= 10;
                headerTopSubMenu.style.height = `${height}px`
                
                if(height <= -850){
                    clearInterval(time)
                    time = null
                    headerTopSubMenu.classList = 'header-top-sub-menu ps-5'
                }

            }
        
        }

    })
})
