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

    if(searchBox.classList.contains('show') && window.innerWidth <= 991){
        if(document.querySelector('.header-menu-fixed')){
            document.querySelector('.header-menu-fixed').remove()
        
            document.querySelector('main').innerHTML = main
            document.querySelector('footer').innerHTML = footer
            
            headerMenuBtn.classList.remove('opened')
        }
    }

})

// header-top-items
const headerTopItem = document.querySelectorAll('.header-top-item.has-sub') 
const headerTopSubMenu = document.querySelector('.header-top-sub-menu')
const closeHeaderTopMenuBtn = document.querySelector('.header-top-sub-menu-close-btn')
const headerTopMenuItems = document.querySelectorAll('.header-top-item-sub')

headerTopItem.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.preventDefault()

        headerTopSubMenu.classList.toggle('show')

        if(document.querySelector('.header-top-item.has-sub.active') && document.querySelector('.header-top-item.has-sub.active').innerHTML != item.innerHTML){
            document.querySelector('.header-top-item.has-sub.active').classList.remove('active')
        }
        
        if(headerTopSubMenu.classList.contains('show'))
            item.classList.add('active')
        else
            item.classList.remove('active')

        if(headerTopSubMenu.classList.contains('show')){

            headerTopSubMenu.querySelector('.content .container').innerHTML = headerTopMenuItems[index].innerHTML

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
            closeHeaderTopMenu()
        }

    })
})

closeHeaderTopMenuBtn.addEventListener('click', () => {
    
    if(document.querySelector('.header-top-item.has-sub.active')){
        document.querySelector('.header-top-item.has-sub.active').classList.remove('active')
    }
    
    closeHeaderTopMenu()
})

function closeHeaderTopMenu(){

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

// header show-menu in the responsive size
const headerMenuBtn = document.querySelector('.header-content-inner-list-item-menu')
const main = document.querySelector('main').innerHTML
const footer = document.querySelector('footer').innerHTML

headerMenuBtn.addEventListener('click', () => {
    headerMenuBtn.classList.toggle('opened')

    const header = document.querySelector('.header')
    
    document.querySelector('main').innerHTML = ''
    document.querySelector('footer').innerHTML = ''

    if(headerMenuBtn.classList.contains('opened')){ 
        const div = document.createElement('div')
        div.classList = 'header-menu-fixed'
        div.innerHTML = `
            <div class="header-menu-fixed-top">
                    
                <ul class="d-flex flex-column list-unstyled p-0">
                    
                    <li class="header-content-inner-list-item has-sub">

                        <a href="" class="header-content-inner-list-item-link">
                            Home
                        </a>
                    
                    </li>

                    ${document.querySelector('.header-content-inner-list ul').innerHTML}
                
                </ul>

            </div>       
        
        <div class="header-menu-fixed-bottom">

            <ul class="header-top-items d-flex flex-column">
                ${document.querySelector('.header-top-items').innerHTML}
            </ul>

        </div>
        `
        header.appendChild(div)
    }

    else {
        document.querySelector('.header-menu-fixed').remove()
        
        document.querySelector('main').innerHTML = main
        document.querySelector('footer').innerHTML = footer
    }

    if(searchBox.classList.contains('show')){
        searchBox.classList.toggle('show')

        searchBtn.innerHTML = '<i class="fas fa-search"></i>'
    }

})

window.addEventListener('resize', () => {
    
    if(window.innerWidth >= 991){
        if(document.querySelector('.header-menu-fixed')){
            document.querySelector('.header-menu-fixed').remove()
        
            document.querySelector('main').innerHTML = main
            document.querySelector('footer').innerHTML = footer
            
            headerMenuBtn.classList.remove('opened')
        }
    }

})

// if a bit scrolled to bottom come fixed header in the top
const header = document.querySelector('.header-content')

window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 100){
        header.classList.add('be-fixed-top')
    }   
    else
        header.classList.remove('be-fixed-top')
})