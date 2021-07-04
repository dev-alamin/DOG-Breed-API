let timer;
let deleteFirstPhotoDelay;

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createReportList(data.message);
    } catch (e) {
        document.querySelector("#breedcount").innerHTML = 'Ops! Cannot load the dogs images. Please check your internet connection'
    }
}
start();

function createReportList(report) {
    document.getElementById("breed").innerHTML = `
<select onchange="loadByBreed(this.value);" class="form-select" aria-label="Default select example">
    <option selected>Select Dog Breed</option>
    ${Object.keys(report).map(function (item) {
        return `<option> ${item}</option>`
    }).join("")}
     </select>
`;
}

async function loadByBreed(breed) {
    if (breed != "Select Dog Breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        createSlideShow(data.message);
        if (data.message.length > 1) {
            document.querySelector("#breedcount").innerHTML = `
       <span>${data.message.length}</span> dogs have been listed in <span>${breed}</span> category
       <h6 style="margin-top:1rem;">Wait and enjoy all the <span>${breed}</span> dogs</h6>
        `;
        } else {
            document.querySelector("#breedcount").innerHTML = `
            <span>${data.message.length}</span> dog has been listed in this <span>${breed}</span> category
             `;
        }
    }
}
function createSlideShow(e) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    if (e.length > 1) {
        document.querySelector("#slider-container").innerHTML = `
        <div class="slider" style="background-image: url('${e[0]}');"></div>
        <div class="slider" style="background-image: url('${e[1]}');"></div>
        `;

        currentPosition += 2;
        timer = setInterval(nextSlide, 3000);
    } else {
        document.querySelector("#slider-container").innerHTML = `
        <div class="slider" style="background-image: url('${e[0]}');"></div>
        <div class="slider""></div>
        `;
    }

    function nextSlide() {
        document.querySelector("#slider-container").insertAdjacentHTML("beforeend", `
        <div class="slider" style="background-image: url('${e[currentPosition]}');"></div>
        `);

        deleteFirstPhotoDelay = setTimeout(() => {
            document.querySelector(".slider").remove();
        }, 1000);

        if (currentPosition + 1 >= e.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }

}