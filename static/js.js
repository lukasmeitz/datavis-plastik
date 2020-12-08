
// make page pretty
document.body.style.overflow = 'hidden';


// handle the scrolling stuffs
var offset = 0;
window.addEventListener('wheel', function(event)
{

    // these are our parameters
    var w = window.innerWidth;
    var h = window.innerHeight;

    event.preventDefault();
    event.stopPropagation();

    var image_box = document.getElementById('image_box');
    var text_box = document.getElementById('text_box');
    var background_box = document.getElementById('background_box');

    // offset -= event.deltaY * 20;
    if(event.deltaY > 0) {
        offset -= window.innerHeight;
    } else {
        offset += window.innerHeight;
    }

    if(offset > 0) {
        offset = 0;
        return;
    }


    text_box.style.transform = "translateY(" + (offset * 1.0) + "px)";
    background_box.style.transform = "translateY(" + (offset * 0.5) + "px)";
    transition_stuff(image_box, offset);

});


async function transition_stuff(image_box, offset) {
    image_box.classList.toggle("transparent");
    await new Promise(r => setTimeout(r, 200));
    image_box.style.transform = "translateY(" + offset + "px)";
    image_box.classList.toggle("transparent");
    await new Promise(r => setTimeout(r, 200));

}


// make the slideshow
function make_slides_from_data() {

    // these are our resources
    var background = "Background.png";

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

    // id list
    var ids = ["kolben_1", "kolben_2", "maennchen_1", "maennchen_2"];

    // loop through our prepared data to generate a slideshow
    var i;
    for(i = 0; i < ids.length; i++){

        // scale the image´s parent div
        var slide_field = document.getElementById(ids[i]);
        slide_field.style.width = w + 'px';
        slide_field.style.height = h + 'px';

        // scale the text and its parent div
        var text_field = document.getElementById(ids[i] + "_text");
        text_field.style.width = w + 'px';
        if( i == 0) {
            text_field.style.height = (h * 1.0) + 'px';
        } else {
            text_field.style.height = (h * 1.0) + 'px';
        }

    }

}

make_slides_from_data();