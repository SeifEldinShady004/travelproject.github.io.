document.addEventListener('DOMContentLoaded', function () {
    // Selectors
    const inputBlog = document.querySelectorAll("#newBlog input");
    const blogDescription = document.querySelector("#newBlog textarea");
    const newBlogModal = document.querySelector(".addBlogPage");
    const addBlogBtn = document.getElementById("addBlog");
    const closeAddBlogBtn = document.getElementById("close");
    const saveBlogButton = document.getElementById("saveBlogButton");
    const printDIV = document.querySelector('.blog-section .row');
    const modalTitle = document.getElementById("modalTitle");
    
    let isEditMode = false;
    let editIndex = -1;

    // Toggle modal visibility
    const toggleDisplay = (element) => element.classList.toggle("d-none");

    // Open modal for adding a new blog
    addBlogBtn.onclick = () => {
        isEditMode = false;
        modalTitle.textContent = "New Blog";
        resetForm();
        toggleDisplay(newBlogModal);
    };

    // Close the modal
    closeAddBlogBtn.onclick = () => toggleDisplay(newBlogModal);

    // Predefined blog posts (if localStorage is empty)
    const defaultBlogs = [
        {
            name: "Cairo",
            destination: "Cairo",
            title: "Cairo",
            blogBrief: "Cairo is a vibrant metropolis where ancient landmarks like the Pyramids of Giza and the Sphinx coexist with bustling markets and modern high-rises, enriched by the serene presence of the Nile River.",
            img: "./image/cairo.jpg",
            description: "Cairo is one of the oldest cities in the world, filled with historical sites and modern urban life."
        },
        {
            name: "Giza",
            destination: "Giza",
            title: "Giza",
            blogBrief: "Giza is famous for its magnificent ancient monuments, including the Great Pyramids and the Sphinx.",
            img: "./image/giza3.jpg",
            description: "Giza is home to the Great Pyramid of Khufu, a wonder of the ancient world."
        },
        {
            name: "Alexandria",
            destination: "Alexandria",
            title: "Alexandria",
            blogBrief: "Alexandria, a historic port city on Egypt's Mediterranean coast, is renowned for its rich cultural heritage.",
            img: "./image/alex.jpg",
            description: "Alexandria was founded by Alexander the Great and is known for its Roman and Greek landmarks."
        },
        {
            name: "Tanta",
            destination: "Tanta",
            title: "Tanta",
            blogBrief: "Tanta is recognized for its vibrant local markets and religious landmarks.",
            img: "./image/Tanta.avif",
            description: "Tanta is famous for its annual religious festivals and traditional Egyptian markets."
        },
        {
            name: "Aswan",
            destination: "Aswan",
            title: "Aswan",
            blogBrief: "Aswan is celebrated for its picturesque landscapes and stunning temples like Philae and Abu Simbel.",
            img: "./image/aswan.webp",
            description: "Aswan is known for its tranquil beauty, stunning Nile views, and ancient Nubian culture."
        }
    ];

    // Initialize the blog array from localStorage or use the default blogs
    let dataArr = JSON.parse(localStorage.getItem("blog")) || defaultBlogs;

    // If localStorage is empty, set the default blogs
    if (!localStorage.getItem("blog")) {
        localStorage.setItem("blog", JSON.stringify(defaultBlogs));
    }

    // Print blogs to the page
    const printBlog = () => {
        let htmlContent = '';
        dataArr.forEach((blog, i) => {
            htmlContent += `
                <div class="col-lg-4 col-md-6 mb-4 blog-post" data-destination="${blog.destination}">
                    <div class="card">
                        <img src="${blog.img}" class="card-img-top" alt="Destination Image">
                        <div class="card-body">
                            <a href="#"><h5 class="card-title">${blog.title}</h5></a>
                            <p class="card-text">${blog.blogBrief}</p>
                        </div>
                        <div class="editbtns">
                            <i class="fa-solid fa-pen-to-square text-warning" onclick="editBlog(${i})"></i>
                            <i class="fa-regular fa-trash-can text-danger" onclick="deleteBlog(${i})"></i>
                        </div>
                    </div>
                </div>
            `;
        });
        printDIV.innerHTML = htmlContent;
    };

    // Initial rendering of the blogs
    printBlog();

    // Save or update a blog
    saveBlogButton.onclick = () => {
        if (isEditMode) {
            updateBlog();
        } else {
            saveBlog();
        }
        printBlog();
        resetForm();
        toggleDisplay(newBlogModal);
    };

    // Save a new blog
    const saveBlog = () => {
        const newBlog = {
            name: inputBlog[0].value,
            destination: inputBlog[1].value,
            title: inputBlog[2].value,
            blogBrief: inputBlog[3].value,
            img: URL.createObjectURL(document.getElementById('blogImage').files[0]),
            description: blogDescription.value
        };
        dataArr.push(newBlog);
        localStorage.setItem('blog', JSON.stringify(dataArr));
    };

    // Update an existing blog
    const updateBlog = () => {
        const updatedBlog = {
            name: inputBlog[0].value,
            destination: inputBlog[1].value,
            title: inputBlog[2].value,
            blogBrief: inputBlog[3].value,
            img: URL.createObjectURL(document.getElementById('blogImage').files[0]),
            description: blogDescription.value
        };
        dataArr[editIndex] = updatedBlog;
        localStorage.setItem('blog', JSON.stringify(dataArr));
        isEditMode = false;
        editIndex = -1;
    };

    // Edit a blog
    window.editBlog = (index) => {
        isEditMode = true;
        editIndex = index;
        modalTitle.textContent = "Edit Blog";
        const blog = dataArr[index];
        inputBlog[0].value = blog.name;
        inputBlog[1].value = blog.destination;
        inputBlog[2].value = blog.title;
        inputBlog[3].value = blog.blogBrief;
        blogDescription.value = blog.description;
        toggleDisplay(newBlogModal);
    };

    // Delete a blog
    window.deleteBlog = (index) => {
        dataArr.splice(index, 1);
        localStorage.setItem("blog", JSON.stringify(dataArr));
        printBlog();
    };

    // Reset form inputs
    const resetForm = () => {
        inputBlog.forEach(input => input.value = '');
        blogDescription.value = '';
        document.getElementById('blogImage').value = '';
    };

    // Search blog posts by destination
    document.getElementById('searchInput').oninput = () => {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach(post => {
            const destination = post.getAttribute('data-destination').toLowerCase();
            post.style.display = destination.startsWith(input) ? "block" : "none";
        });
    };
});
