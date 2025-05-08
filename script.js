//header

window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  
//search bar

const filterButtonsContainer = document.querySelector(".filter-buttons");
const search = document.querySelector(".search-box input");
const searchImg = document.querySelectorAll(".gallery .gallery-item");

search.addEventListener("focus", () => {
    filterButtonsContainer.style.display = "flex";
});

document.addEventListener("click", (e) => {
    const isSearchOrFilter = 
        e.target === search || 
        e.target.closest(".filter-buttons") || 
        e.target.closest(".search-box");

    if (!isSearchOrFilter) {
        filterButtonsContainer.style.display = "none";
    }
});

search.addEventListener("keyup", e=>{
    if (e.key === "Enter") {
        let value = search.value.toLowerCase().trim();
        searchImg.forEach(image => {
            const imageName = image.dataset.name.toLowerCase();
            if (imageName.includes(value)) {
                image.classList.remove("hide");
            } else {
                image.classList.add("hide");
            }
        });

        document.querySelectorAll(".filter-buttons button").forEach(btn => {
            btn.classList.remove("active");
        });
    }
});

search.addEventListener("keyup", ()=>{
    if (search.value.trim() === "") {
        searchImg.forEach(image => {
            image.classList.remove("hide");
        });

        document.querySelectorAll(".filter-buttons button").forEach(btn => {
            if (btn.dataset.name === "all") {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }
});


//filter

const filterButtons = document.querySelectorAll(".filter-buttons button");
const filterableImg = document.querySelectorAll(".gallery .gallery-item");

const filterImg = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    
    const filterValue = e.target.dataset.name.toLowerCase();

    filterableImg.forEach(gallery_item => { 
        gallery_item.classList.add("hide");

        const imageTags = gallery_item.dataset.name.toLowerCase();

        if (imageTags.includes(filterValue) || filterValue === "all") {
            gallery_item.classList.remove("hide");
        }
    });
};

filterButtons.forEach(button => button.addEventListener("click",filterImg));

//gallery

let fullImgBox = document.getElementById("fullImgBox");
let fullImg = document.getElementById("fullImg");
let currentIndex = 0 ;
let images = document.getElementsByClassName('gallery-item');

for(let i = 0 ; i < images.length ; i++){
    images[i].onclick = function (){
        openBox();
        currentIndex = i ;
        displayImg(currentIndex);
    };
}

function openBox(){
    fullImgBox.style.display = "flex" ;
    document.getElementById("main-header").classList.add("box-opened");
}

function closeBox(){
    fullImgBox.style.display = "none" ;
    document.getElementById("main-header").classList.remove("box-opened");
}

function displayImg(index){
    fullImg.src = images[index].src ;
}

function changeImg(n){
    currentIndex += n ;
    if(currentIndex >= images.length){
         currentIndex = 0 ;
    }else if(currentIndex < 0){
         currentIndex = images.length -1 ;
    }
    displayImg(currentIndex);
}

window.onclick = function (event){
    if(event.target === fullImgBox){
        closeBox();
    }
}