const accesskey = "m1YsIYPVAucASF0HZ70PlxArrc-QQQb1yulG4_oymaQ";
const formEL = document.querySelector("form");
const inputEL = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-show");

let inputData = "";
let page = 1;

async function searchImages() { // Add the "async" keyword to use "await" in this function
    inputData = inputEL.value; // Use "value" instead of "ariaValueMax"
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`; // Use the correct API endpoint

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = ''; // Clear the inner HTML
        }

        const results = data.results;

        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small; // Use "urls.small" for the image source
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html; // Use "links.html" for the image link
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResult.appendChild(imageWrapper); // Append the image wrapper to the search result

        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

formEL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
