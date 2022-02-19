const form = document.querySelector('#searchForm');
const imageDisplay = document.querySelector('#imageDisplay');

const getImage = async function (e) {
    e.preventDefault();
    imageDisplay.innerHTML = "";
    const searchTerm = form.elements.query.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
    makeImages(res.data);
    form.elements.query.value = "";

}

const makeImages = (shows) => {
    
    if (shows.length === 0) {
        const noImgText = document.createElement('span');
        noImgText.innerText = 'No images found! Try another search term.';
        imageDisplay.append(noImgText)
    }
    for (let result of shows) {

        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            imageDisplay.append(img);
        }
    }
}

form.addEventListener('submit', getImage)
