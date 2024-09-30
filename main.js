let searchBtn = document.querySelector("#search-btn")
let searchForm = document.querySelector(".search-form") 
let loginForm = document.querySelector(".login-form")
let menuBar = document.querySelector("#menu-bar")
let amenu = document.querySelector(".navbar")
let vidBtn = document.querySelectorAll(".video-btn")


function showbar(){
    searchBtn.classList.toggle("fa-times")
    searchForm.classList.toggle("active")
}
function showform(){
    loginForm.classList.add("active")
}
function hideform(){
    loginForm.classList.remove("active")

}
function showmenu(){
    menuBar.classList.toggle("fa-times")
    amenu.classList.toggle("active")
}
vidBtn.forEach(slide =>{
    slide.addEventListener("click" , function(){
        
        document.querySelector(".controls .blue").classList.remove("blue");
        slide.classList.add("blue");
        let src = slide.getAttribute("data-src");
        document.querySelector("#video-slider").src = src;
    
    })
})

let blog
let homeblogs=document.getElementById("2lby");
if(JSON.parse(localStorage.getItem("blog"))==null){
    blog=[];
    console.log("hello");

    console.log(JSON.parse(localStorage.getItem("blog")));
}
else{
    blog=JSON.parse(localStorage.getItem("blog"));
    printhomeblogs();
    console.log(blog);
}


function printhomeblogs(){
    let txt=``;
    for (let i=0; i<blog.length; i++){
        txt+=` <div class="box">
            <img src="${blog[i].img}" alt="">
            <div class="content">
                <h3><i class="fas fa-map-marker-alt"></i> ${blog[i].title}</h3>
                <p>${blog[i].blogBrief}</p>
            </div>
        </div>`;
    }
    homeblogs.innerHTML=txt;
}

// const defaultBlogs = [
//     {
//         name: "Cairo",
//         destination: "Cairo",
//         title: "Cairo",
//         blogBrief: "Cairo is a vibrant metropolis where ancient landmarks like the Pyramids of Giza and the Sphinx coexist with bustling markets and modern high-rises, enriched by the serene presence of the Nile River.",
//         img: "./image/cairo.jpg",
//         description: "Cairo is one of the oldest cities in the world, filled with historical sites and modern urban life."
//     },
//     {
//         name: "Giza",
//         destination: "Giza",
//         title: "Giza",
//         blogBrief: "Giza is famous for its magnificent ancient monuments, including the Great Pyramids and the Sphinx.",
//         img: "./image/giza3.jpg",
//         description: "Giza is home to the Great Pyramid of Khufu, a wonder of the ancient world."
//     },
//     {
//         name: "Alexandria",
//         destination: "Alexandria",
//         title: "Alexandria",
//         blogBrief: "Alexandria, a historic port city on Egypt's Mediterranean coast, is renowned for its rich cultural heritage.",
//         img: "./blog/image/alex.jpg",
//         description: "Alexandria was founded by Alexander the Great and is known for its Roman and Greek landmarks."
//     },
//     {
//         name: "Tanta",
//         destination: "Tanta",
//         title: "Tanta",
//         blogBrief: "Tanta is recognized for its vibrant local markets and religious landmarks.",
//         img: "./image/Tanta.avif",
//         description: "Tanta is famous for its annual religious festivals and traditional Egyptian markets."
//     },
//     {
//         name: "Aswan",
//         destination: "Aswan",
//         title: "Aswan",
//         blogBrief: "Aswan is celebrated for its picturesque landscapes and stunning temples like Philae and Abu Simbel.",
//         img: "./image/aswan.webp",
//         description: "Aswan is known for its tranquil beauty, stunning Nile views, and ancient Nubian culture."
//     }
// ];
