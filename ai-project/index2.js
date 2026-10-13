console.log('index is connected');


// ================================
// 1. LOADER
// ================================

const toggleLoader = (isLoading) => {

    const loader = document.getElementById('loader');
    const container = document.getElementById('video-container');

    if (isLoading) {
        loader.classList.remove('hidden');
        container.classList.add('hidden');
    } else {
        loader.classList.add('hidden');
        container.classList.remove('hidden');
    }
};


// ================================
// 2. REMOVE ACTIVE CLASS
// ================================

const removeActiveClass = () => {

    const activeButtons = document.querySelectorAll('.active');

    activeButtons.forEach(btn => {
        btn.classList.remove('active');
    });
};


// ================================
// 3. LOAD CATEGORIES --> 1
// ================================

const loadCategories = async () => {

    try {

        const response = await fetch(
            'https://openapi.programming-hero.com/api/phero-tube/categories'
        );

        const data = await response.json();

        displayCategories(data.categories);

    } catch (error) {

        console.error('Error loading categories:', error);

    }
};


// ================================
// 4. DISPLAY CATEGORIES --> 2 
// ================================

const displayCategories = (categories) => {

    const categoryContainer =
        document.getElementById('category-container');

    // All button যেন মুছে না যায়
    categoryContainer.innerHTML = `
        <button
            id="btn-all"
            onclick="loadVideos()"
            class="btn btn-sm"
        >
            All
        </button>
    `;

    categories.forEach(category => {

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
            <button
                id="btn-${category.category_id}"
                onclick="loadCategoriesVideos('${category.category_id}')"
                class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white"
            >
                ${category.category}
            </button>
        `;

        categoryContainer.append(categoryDiv);
    });
};


// ================================
// 5. LOAD ALL VIDEOS / SEARCH   -->3
// ================================

const loadVideos = async (searchText = '') => {

    toggleLoader(true);

    try {

        const response = await fetch(
            `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
        );

        const data = await response.json();

        removeActiveClass();

        const allButton =
            document.getElementById('btn-all');

        if (allButton) {
            allButton.classList.add('active');
        }

        displayVideos(data.videos);

    } catch (error) {

        console.error('Error loading videos:', error);

    } finally {

        toggleLoader(false);

    }
};


// ================================
// 6. LOAD CATEGORY VIDEOS
// ================================

const loadCategoriesVideos = async (id) => {

    toggleLoader(true);

    try {

        const url =
            `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

        const response = await fetch(url);

        const data = await response.json();

        removeActiveClass();

        const clickedButton =
            document.getElementById(`btn-${id}`);

        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        displayVideos(data.category);

    } catch (error) {

        console.error('Error loading category videos:', error);

    } finally {

        toggleLoader(false);

    }
};


// ================================
// 7. LOAD VIDEO DETAILS
// ================================

const loadVideoDetails = async (videoId) => {

    try {

        const url =
            `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

        const response = await fetch(url);

        const data = await response.json();

        displayVideoDetails(data.video);

    } catch (error) {

        console.error('Error loading video details:', error);

    }
};


// ================================
// 8. DISPLAY VIDEO DETAILS
// ================================

const displayVideoDetails = (video) => {

    const modal =
        document.getElementById('video_details');

    const detailsContainer =
        document.getElementById('details-container');

    detailsContainer.innerHTML = `

        <div class="card bg-base-100 image-full shadow-sm">

            <figure>
                <img
                    src="${video.thumbnail}"
                    alt="${video.title}"
                />
            </figure>

            <div class="card-body">

                <h2 class="card-title">
                    ${video.title}
                </h2>

                <p>
                    ${video.description}
                </p>

            </div>

        </div>

    `;

    modal.showModal();
};


// ================================
// 9. TIME CONVERSION
// ================================

const getTimeString = (time) => {

    const seconds = Number(time);

    const hours = Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    return `${hours}hrs ${minutes} min ago`;
};


// ================================
// 10. DISPLAY VIDEOS   --> 4
// ================================

const displayVideos = (videos) => {

    const videoContainer =
        document.getElementById('video-container');

    videoContainer.innerHTML = '';


    // No videos
    if (!videos || videos.length === 0) {

        videoContainer.innerHTML = `

            <div
                class="col-span-full flex flex-col
                text-center justify-center
                items-center py-20"
            >

                <img
                    class="w-[120px]"
                    src="assets/Icon.png"
                    alt="No content"
                >

                <h2 class="text-2xl font-bold mt-4">
                    Oops!! Sorry, There is no content here.
                </h2>

            </div>

        `;

        return;
    }


    // Videos
    videos.forEach(video => {

        const videoCard =
            document.createElement('div');


        const author = video.authors?.[0];


        videoCard.innerHTML = `

            <div
                class="card bg-base-100 px-2 py-2
                shadow-sm border border-gray-100
                flex flex-col justify-between h-full"
            >

                <!-- Thumbnail -->

                <figure class="relative">

                    <img
                        class="w-full h-[150px]
                        object-cover rounded-lg"
                        src="${video.thumbnail}"
                        alt="${video.title}"
                    >

                    ${video.others?.posted_date
                ?
                `
                        <span
                            class="absolute bottom-2 right-2
                            text-white bg-black
                            text-xs rounded px-2 py-0.5"
                        >
                            ${getTimeString(
                    video.others.posted_date
                )}
                        </span>
                        `
                :
                ''
            }

                </figure>


                <!-- Author + Info -->

                <div class="flex gap-3 mt-3 flex-1">

                    <!-- Profile -->

                    <div class="avatar">

                        <div class="w-8 h-8 rounded-full">

                            <img
                                src="${author?.profile_picture || ''}"
                                alt="${author?.profile_name || ''}"
                            >

                        </div>

                    </div>


                    <!-- Information -->

                    <div class="intro flex-1">

                        <h2
                            class="text-sm font-semibold
                            line-clamp-2"
                        >
                            ${video.title}
                        </h2>


                        <p
                            class="text-sm text-gray-400
                            flex items-center gap-1 mt-1"
                        >

                            ${author?.profile_name || 'Unknown'}

                            ${author?.verified
                ?
                `
                                <img
                                    class="w-4 h-4"
                                    src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                                    alt="verified"
                                >
                                `
                :
                ''
            }

                        </p>


                        <p
                            class="text-xs text-gray-400 mt-0.5"
                        >
                            ${video.others?.views || 0} views
                        </p>

                    </div>

                </div>


                <!-- Details Button -->

                <button
                    onclick="loadVideoDetails('${video.video_id}')"
                    class="btn btn-sm btn-neutral mt-3 w-full"
                >
                    Show Details
                </button>

            </div>

        `;

        videoContainer.append(videoCard);

    });
};


// ================================
// 11. SEARCH
// ================================

let searchTimeout;

document
    .getElementById('search-input')
    .addEventListener('input', (event) => {

        const searchText = event.target.value;

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {

            loadVideos(searchText);

        }, 500);

    });


// ================================
// 12. INITIAL LOAD
// ================================

loadCategories();
loadVideos();