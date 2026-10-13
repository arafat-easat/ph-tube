console.log('index is connected');

const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video-container').classList.add('hidden');
}

const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video-container').classList.remove('hidden');
}


function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active');
    for (const btn of activeButtons) {
        btn.classList.remove('active')
    }

}

// 1
function loadCategories() {
    // fetch the data

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert promise to json 
        .then((res) => res.json())
        // send data to display
        .then((data) => displayCategories(data.categories));

}

// 3
function loadVideos(searchText = '') {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((response) => response.json())
        .then((data) => {

            removeActiveClass();
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos)

        })
}
// 4
// 1001
const loadCategoriesVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add('active')

            displayVideos(data.category);
        })
}

const loadVideoDetails = (videoId) => {
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}
const displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `

   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    
    `
}

// 2
function displayCategories(categories) {
    const categoryContainer = document.getElementById('category-container');

    for (const cat of categories) {
        console.log(cat);

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button id='btn-${cat.category_id}' onclick='loadCategoriesVideos(${cat.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(categoryDiv);

    }

}


// video
// : 
// authors
// : 
// Array(1)
// 0
// : 
// {profile_picture: 'https://i.ibb.co/XVHM7NP/kevin.jpg', profile_name: 'Kevin Hart', verified: false}
// length
// : 
// 1
// [[Prototype]]
// : 
// Array(0)
// category_id
// : 
// "1003"
// description
// : 
// "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// others
// : 
// {views: '1.1K', posted_date: '13885'}
// thumbnail
// : 
// "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg"
// title
// : 
// "Laugh at My Pain"
// video_id
// : 
// "aaac"

// 5
function displayVideos(video) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ``;

    if (video.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! sorry, There is no content here.</h2>
    </div>
       
    `
        hideLoader();
        return;

    }

    video.forEach(video => {
        console.log(video)
        const videoCard = document.createElement('div')
        videoCard.innerHTML = `

 <div class="card bg-base-100 px-2 ">

        <figure class="relative">
            <img class='w-full h-[150px] object-cover' src="${video.thumbnail}" alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-white bg-black text-sm rounded px-2">3hrs 56 min ago</span>
        </figure>


        <div class="flex gap-3">

            <div class="profile">
                <div class="avatar">
                    <div class="w-8 rounded-full">
                        <img alt="Tailwind-CSS-Avatar-component"
                            src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
            </div>

            <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>

                <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                ${video.authors[0].verified == true ? ` <img class="w-5 h-5"
                        src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``
            }
                </p >
                
        <p class="text-sm text-gray-400 flex gap-1">${video.others.views}</p>

            </div >
        </div >
        <button onclick=loadVideoDetails('${video.video_id}') class= "btn btn-block" > show Details</button >
    </div >
        `;

        videoContainer.append(videoCard)
    });
    hideLoader();
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    const input = e.target.value;
    loadVideos(input);
})

loadCategories();
loadVideos();
