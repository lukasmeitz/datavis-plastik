
// make page pretty
document.body.style.overflow = 'hidden';


// handle the scrolling stuffs
var offset = 0;
window.addEventListener('wheel', function(event)
{

    event.preventDefault();
    event.stopPropagation();

    var image_box = document.getElementById('image_box');
    var text_box = document.getElementById('text_box');
    var background_box = document.getElementById('background_box');

    offset -= event.deltaY * 20;

    image_box.style.transform = "translateY(" + offset + "px)";
    text_box.style.transform = "translateY(" + (offset * 1.5) + "px)";
    background_box.style.transform = "translateY(" + (offset * 0.5) + "px)";

});



// make the second slide div
function make_slide_2() {

    var root_div = document.createElement("div");



}


// make the slideshow
function make_slides_from_data() {

    // these are our resources
    var background = "Background.png";
    var data = ["",
                "PLASTIK: DIE UNSICHTBAREN GEFAHREN",
                "WAS MACHT PLASTIK SO GEFÄHRLICH FÜR UNS?",
                ""];
     var images = ["", "Kugel_1.png", "Kolben_Rot.png", ""];


    // either width or height should always be at min 100 %
    // already solved: set background mode to div-contain

    // these are our parameters
    var w = window.innerWidth;
    var h = window.innerHeight;


    // we start by preparing our scroll boxes, one for each moving layer
    var background_box = document.getElementById('background_box');
    var image_box = document.getElementById('image_box');
    var text_box = document.getElementById('text_box');


    // set the background
    var background = document.createElement("div");
    background.style.backgroundImage = "url('Background.png')";
    background.style.width = '100%';
    background.style.height = '5760px';
    background_box.appendChild(background);


    // loop through our prepared data to generate a slideshow
    var i;
    for(i = 0; i < data.length; i++){

        // create a background slide element
        var slide_field = document.createElement("div");
        slide_field.style.backgroundImage = "url('" + images[i] + "')";
        slide_field.style.width = w + 'px';
        slide_field.style.height = h + 'px';
        image_box.appendChild(slide_field);

        // create a text field element in the overlay
        var text_field = document.createElement("div");
        text_field.innerHTML = data[i];
        text_field.style.width = w + 'px';
        if( i == 0) {
            text_field.style.height = (h * 1.25 ) + 'px';
        } else {
            text_field.style.height = (h * 1.5) + 'px';
        }
        text_box.appendChild(text_field);

    }

}

make_slides_from_data();