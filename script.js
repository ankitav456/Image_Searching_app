const accessKey = "DD9fHrrRccdJY-SfAkEIF1EsSj6Mx0-i8gg_zC0b8NA";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages(resetResults = false) {
    if (resetResults) {
        searchResults.innerHTML = "";
        page = 1;
    }

    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (results.length === 0) {
            // Display a message when no results are found
            const noResultsMessage = document.createElement("p");
            noResultsMessage.textContent = "No results found.";
            searchResults.appendChild(noResultsMessage);
        } else {
            results.forEach((result) => {
                // Append results as before
            });

            page++; // Increment page for the next request
            showMore.style.display = "block"; // Show the "Show More" button
        }
    

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++; // Increment page for the next request
        showMore.style.display = "block"; // Show the "Show More" button

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    searchImages(true); // Pass true to reset results when submitting a new query
});

showMore.addEventListener("click", () => {
    searchImages();
});


