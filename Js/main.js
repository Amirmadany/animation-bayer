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

        // start bottom header
        const headerTopItem = document.querySelectorAll('.header-menu-fixed-bottom .header-top-item.has-sub') 
        
        headerTopItem.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                header.classList.add('d-none')

                const div = document.createElement('div')
                div.classList = 'header-bottom-content-inner'
                div.innerHTML = `
                    <div class="content">

                        <button class="header-top-sub-menu-close-btn">
                            <i class="fas fa-times"></i>
                        </button>

                        <div class="container pt-3">
                            
                            <!-- dynamic data -->
                            ${item.querySelector('.header-top-item-sub').innerHTML}
                            <!-- dynamic data -->

                        </div>

                    </div>
                `

                document.body.appendChild(div)
                document.body.style.background = '#624963'
                
                window.scrollTo({
                    top: 0
                })

                document.querySelector('.header-bottom-content-inner .header-top-sub-menu-close-btn').addEventListener('click', () => {
                    closeTheResponsiveSubMenuBottom()
                })

            })
        })

        const headerMainItems = document.querySelectorAll('.header-menu-fixed .header-content-inner-list-item.has-sub')

        headerMainItems.forEach(item => {
            item.addEventListener('click', (event) => {
                if(event.target.parentElement == item || event.target.parentElement.parentElement == item || event.target.parentElement.classList.contains('has-sub') || event.target.parentElement.parentElement.classList.contains('has-sub'))
                    event.preventDefault()

                if(item.classList.contains('active') && (event.target.parentElement == item || event.target.parentElement.parentElement == item)){
                    item.querySelector('.header-content-inner-list-item-sub-menu').classList.add('d-none')
                    item.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                        item.classList.add('d-none')
                    })

                    document.querySelectorAll('.header-menu-fixed .header-content-inner-list-item').forEach(item => {
                        item.classList.remove('d-none')
                    })
                    
                    item.querySelector('a').classList.add('justify-content-between')
                    
                    item.classList.remove('active')

                    if(item.querySelector('li.active')){

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.remove('d-none')
                        })

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.add('d-none')
                        })

                        item.querySelector('li.active').classList.remove('active')
                    }

                    if(item.querySelector('li.active')){

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.remove('d-none')
                        })

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.add('d-none')
                        })

                        item.querySelector('li.active').classList.remove('active')
                    }

                    if(item.querySelector('li.active')){

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.remove('d-none')
                        })

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.add('d-none')
                        })

                        item.querySelector('li.active').classList.remove('active')
                    }

                    if(item.querySelector('li.active')){

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.remove('d-none')
                        })

                        item.querySelectorAll('li.active .header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.add('d-none')
                        })

                        item.querySelector('li.active').classList.remove('active')
                    }
                    
                }

                else {
                     
                    if((event.target.parentElement.classList.contains('has-sub') || event.target.parentElement.parentElement.classList.contains('has-sub')) && (event.target.parentElement != item && event.target.parentElement.parentElement != item)){
                        let ul = event.target.parentElement.parentElement
                        let li = event.target.parentElement;
                        
                        if(ul.tagName != 'UL')
                            ul = event.target.parentElement.parentElement.parentElement
                        if(li.tagName != 'LI')
                            li = event.target.parentElement.parentElement
                        
                        if(!li.classList.contains('active')){
                            ul.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                                item.classList.add('d-none')
                            })
    
                            li.classList.remove('d-none')
    
                            li.classList.add('active')
                            
                            li.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                                item.classList.remove('d-none')
                            })

                            if(li.querySelector('li.has-sub.active')){
                               const main = li.querySelectorAll('li.has-sub.active')

                                main.forEach(item => {
                                   item.classList.remove('active')
                                })
                            }
                        }
                        else {
                            event.target.parentElement.classList.remove('active')
                            event.target.parentElement.parentElement.classList.remove('active')

                            ul.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                                item.classList.remove('d-none')
                            })

                            li.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                                item.classList.add('d-none')
                            })
                            
                        }
                    }

                    else {
                        document.querySelectorAll('.header-menu-fixed .header-content-inner-list-item').forEach(item => {
                            item.classList.add('d-none')
                        })
        
                        item.classList.remove('d-none')
                        item.classList.add('active')
        
                        item.querySelector('a').classList.remove('justify-content-between')
        
                        item.querySelector('.header-content-inner-list-item-sub-menu').classList.remove('d-none')
                        item.querySelectorAll('.header-content-inner-list-item-sub-menu-list-item').forEach(item => {
                            item.classList.remove('d-none')
                        })  
                    }
                }

            })
        })

    }

    else {
        document.querySelector('.header-menu-fixed').remove()
        
        document.querySelector('main').innerHTML = main
        document.querySelector('footer').innerHTML = footer
        
        // work scroll to top
        const scrollTopBtn = document.querySelector('.scrollTopBtn')
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0
            })  
        })

    }

    if(searchBox.classList.contains('show')){
        searchBox.classList.toggle('show')

        searchBtn.innerHTML = '<i class="fas fa-search"></i>'
    }

})

function closeTheResponsiveSubMenuBottom(){
    document.body.querySelector('.header-bottom-content-inner').remove()

    document.querySelector('.header').classList.remove('d-none')

    document.body.style.background = 'none'
}

window.addEventListener('resize', () => {
    
    if(window.innerWidth >= 991){
        if(document.querySelector('.header-menu-fixed')){
            document.querySelector('.header-menu-fixed').remove()
        
            document.querySelector('main').innerHTML = main
            document.querySelector('footer').innerHTML = footer
            
            headerMenuBtn.classList.remove('opened')

            if(document.body.querySelector('.header-bottom-content-inner')){
                closeTheResponsiveSubMenuBottom()
            }

            const scrollTopBtn = document.querySelector('.scrollTopBtn')
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0
                })  
            })

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

    if(document.querySelector('.footer')){
        if(window.pageYOffset >= 250){
            if(document.querySelector('.scrollTopBtn'))
                document.querySelector('.scrollTopBtn').classList.remove('d-none')
        }
        else {
            if(document.querySelector('.scrollTopBtn'))
              document.querySelector('.scrollTopBtn').classList.add('d-none')
        }
    }
})

// scrollTop btn
const scrollTopBtn = document.querySelector('.scrollTopBtn')
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0
    })  
})