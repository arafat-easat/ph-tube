// 1 
const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await response.json();
        displayCategories(data.categories)
    } catch (error) {
        console.log(error)
    }
}
// 2
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');


    categories.forEach(category => {

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button  class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;

        categoryContainer.append(categoryDiv)

    });
}

// 3
const loadVideos = async (searchText = '') => {
    try {
        const response = await fetch(
            `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await response.json();
        displayVideos(data.videos)


    } catch (error) {
        console.log(error)
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 ">
<!--df-->
            <figure>
                <img src="${video.thumbnail}" alt="Shoes" />
            </figure>

            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            </div>

        </div>

           
        `;
        videoContainer.append(videoCard)
    })
}
loadCategories();