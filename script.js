window.addEventListener('load', (e) => {
    setTimeout(() => {
        console.log('Hi')
        document.getElementById("text").style.display = 'block';
    }, 995)
    
    setTimeout(() => {
        console.log('Hi')
        document.querySelector(':root').style.setProperty('--cursor', 'none');
    }, 3000)
})

const fetchData = async () => {
    return await fetch('topics.json')
                .then(response => {
                    return response.json()
                })
                .catch(err => {
                    console.error(err)
                })
}

let intro_flag = 0
const onScroll = (click = false) => {
    let introduction = document.querySelector('.introduction')
    if (intro_flag === 0) {
        intro_flag = 1;
        introduction.animate(
            [
                {
                    opacity: 1,
                    height: "100%"
                },
                {
                    opacity: 0,
                    height: "0%"
                }
            ], {
                duration: 500, 
                fill: "forwards",
                easing: "ease-in-out"
            }
        );
        if(!click)
            window.removeEventListener('scroll', onScroll);
    }
};

window.addEventListener('scroll', onScroll);

const search = () => {
    let searchBox = document.querySelector('.nav-search-box')
    searchBox.classList.add('nav-search-box-hover')
}
const searchLeave = () => {
    let searchBox = document.querySelector('.nav-search-box')
    searchBox.classList.remove('nav-search-box-hover')
}

const mobileSelect = () => {
    let hiddenNavBar = document.querySelector('.nav-mobile-container')

    if(hiddenNavBar.style.display != 'none')
    {
        hiddenNavBar.style.display = 'none';
    }
    else{
        hiddenNavBar.style.display = 'flex';
    }
}

const showContent = (link, e) => {
    console.log(link)
    console.log(e.target.classList)
    document.querySelector('.main-content-iframe').src = link
    document.querySelector('.active')?.classList?.remove('active')
    e.target.classList.add('active')

}

fetchData()
    .then(data => {
        console.log(data)
        let topicsList = document.querySelector('.topics-list')
        data?.topics?.forEach(topic => 
            {
                let node = document.createElement('div')
                node.classList.add('topic')
                node.innerHTML += '<span class="topic-name" onclick="showContent(\''+topic?.link+'\',event)">'+topic?.name+'</span>'
                // node.innerHTML += '<span class="topic-name" onclick="showContent(true,event)">'+topic?.name+'</span>'
                let subnode = document.createElement('div')
                subnode.classList.add('topic-subtopics')
                topic?.subtopics?.forEach(subtopic => {
                    subnode.innerHTML += '<span class="subtopic-name" onclick="showContent(\''+subtopic?.link+'\',event)">'+subtopic?.name+'</span>'
                    
                });
                node.appendChild(subnode)
                topicsList.appendChild(node)
            }
        )


    }).catch(err => {
        console.error("Error in fetching Topics", err)
    })

const showTopics = () => {
    let sidebar = document.querySelector('.main-sidebar')
    let sidebarShow = document.querySelector('.sidebar-show')
    let icon = document.querySelector('.sidebar-show i')
    let showSpan = document.querySelector('.sidebar-show span')
    let mainContent = document.querySelector('.main-content')

    let mobile = window.screen.width <= 500?true:false
    if(sidebar.style.display != 'none')
    {
        if(mobile)
            mainContent.style.flex = 1
        sidebar.style.display = 'none'
        sidebarShow.style.transform = 'translate(5%,-50%)'
        sidebarShow.classList.remove('sidebar-show-left')
        sidebarShow.classList.add('sidebar-show-right')
        icon.classList.remove('fa-angle-double-left')
        icon.classList.add('fa-angle-double-right')
        showSpan.innerHTML = 'Show Topics'
    }
    else{
        if(mobile)
            mainContent.style.flex = 0
        sidebar.style.display = 'block'
        sidebarShow.style.transform = 'translate(-100%,-50%)'
        sidebarShow.classList.remove('sidebar-show-right')
        sidebarShow.classList.add('sidebar-show-left')
        icon.classList.remove('fa-angle-double-right')
        icon.classList.add('fa-angle-double-left')
        showSpan.innerHTML = 'Hide Topics'

    }
}
