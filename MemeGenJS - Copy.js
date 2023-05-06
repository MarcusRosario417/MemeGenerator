const image = document.querySelector("#img");

const topText = document.querySelector("#top-text");

const bottomText = document.querySelector("#bottom-text");

const canvas = document.querySelector("meme");

// <img src="#img.value">

let img;

image.addEventListener("change", () => {
    const imageDataUrl = URL.createObjectURL(image.files[0]);

    img = new Image();
    img.src = imageDataUrl;

    img.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topText.value, bottomText.value);
    }, { once : true});
});

topText.addEventListener("change", () => {
    updateMemeCanvas(canvas,image,topText.value, bottomText.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    // update canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // Prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    // Add top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    // Add bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}