const img2pdf = require("images-to-pdf");

(async function(){
    try {
        await img2pdf(["./", "/path/to/image2.jpg"], "");
    } catch (e) {
        console.log(e);
    }
})()
