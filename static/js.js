


/* make page pretty */
document.body.style.overflow = 'hidden';

var scroll_lock = false;


/* handle the scrolling stuffs */
var offset = 0;
window.addEventListener('wheel', function(event)
{

    // these are our parameters
    var w = window.innerWidth;
    var h = window.innerHeight;

    event.preventDefault();
    event.stopPropagation();

    scrolling(event.deltaY);

});

function scrolling(deltaY, locking=true) {

    if(locking){
        if(scroll_lock){
            return;
        } else {
            scroll_lock = true;
            function free_scroll() {
                scroll_lock = false;
            }

            setTimeout(free_scroll, 400);
        }
    }

    var image_box = document.getElementById('image_box');
    var text_box = document.getElementById('text_box');
    var background_box = document.getElementById('background_box');
    var bubble_box = document.getElementById('bubble_box');

    //offset -= event.deltaY * 20;
    if(deltaY > 0) {
        offset -= window.innerHeight;
    } else {
        offset += window.innerHeight;
    }

    if(offset > 0) {
        offset = 0;
        return;
    }

    let page_number = -1 * offset / window.innerHeight;

    setScrollBar(page_number);
    console.log("page number: " + page_number);


    text_box.style.transform = "translateY(" + (offset * 1.0) + "px)";
    background_box.style.transform = "translateY(" + (offset * 0.2) + "px)";
    bubble_box.style.transform = "translateY(" + (offset * 0.4) + "px)";
    transition_stuff(image_box, offset);
}

async function transition_stuff(image_box, offset) {
    image_box.classList.toggle("transparent");
    await new Promise(r => setTimeout(r, 200));
    image_box.style.transform = "translateY(" + offset + "px)";
    await new Promise(r => setTimeout(r, 200));
    image_box.classList.toggle("transparent");
    await new Promise(r => setTimeout(r, 200));
}



/* handle scrolling bar stuff */
function setScrollBar(page_number) {

    for(var i=0; i <= 7; i++){
        var elem = document.getElementById(i+"");
        if(i == page_number){
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
        }
    }

}

/* show label of navbar */
function showNavLabel(event) {
    event.getElementsByClassName("label")[0].style.display = "block";
}
/*
hiden die Label
 */
function hideNavLabel(event) {
    event.getElementsByClassName("label")[0].style.display = "none";
}

function setClickScrollPage(page_number) {
    let deltaY;
    for(let i=0; i <= 7; i++){
        let elem = document.getElementById(i+"");

        if(elem.classList.contains("active")){
            deltaY = page_number - i ;
        }
    }

    for(let j = 0; j < Math.abs(deltaY) ; j++){
        scrolling(deltaY, locking=false);
    }


}






/* Handle the magnifying glass interaction */
function glassMagnifier() {
    var isGlassSelected = false;
    var glass = document.getElementById("glass");
    var glass_img = document.getElementById("magnifier-glass");
    var ende_Screen = document.getElementById("objekte");
    var particle_image = document.getElementById("particle_image");

    glass.addEventListener("mousedown", function (e) {
        e.preventDefault();
        isGlassSelected = true;
        console.log("mouse ist down!!!!!!");
    });
    glass.addEventListener("mousemove", moveMagnifier);
    ende_Screen.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("mouseup", function (e) {
        e.preventDefault();
        isGlassSelected = false;
        console.log("mouse ist up*******");
    });

    function moveMagnifier(event) {
        let pos, x, y;
        let w = glass_img.offsetWidth / 2;
        let h = glass_img.offsetHeight / 2;
        event.preventDefault();

        if(isGlassSelected){
            pos = getCursorPos(event, ende_Screen);
            x = pos.x;
            y = pos.y;
            console.log("is moved x= "+ x +" y= "+ y);

            /*prevent the magnifier glass from being positioned outside the image:*/
            if (x > ende_Screen.width - (w / 3)) {x = ende_Screen.width - (w / 3);}
            if (x < w / 4) {x = w / 4;}
            if (y > ende_Screen.height - (h / 3)) {y = ende_Screen.height - (h / 3);}
            if (y < h/4) {y = h / 4;}
            /*set the position of the magnifier glass:*/
            glass_img.style.left = ((x - w)-50) + "px";
            glass_img.style.top = ((y - h)-50) + "px";
            //cir_red.style.left = x + "px";
            //cir_red.style.top = y+ "px";
            particle_clipping(pos, particle_image);
        }
    }
    function getCursorPos(e,img) {
        let a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
    function particle_clipping(event,particle_image){
        var x = event.x-105;
        var y = event.y-145;
        particle_image.style = "clip-path: circle(130px at "+x+"px "+y+"px);";

    }
}



/* handle the health issue info view */
var num_issue_persistence = 0;
var health_toggle_persistence = true;

function toggle_health(num_issue = -1) {

    if(num_issue == -1){
        num_issue = num_issue_persistence;
    } else {
        num_issue_persistence = num_issue;
    }

    var issues = ["bpa", "fsm", "pht", "hm"];
    console.log("issue is: " + issues[num_issue]);

    for(var i = 0; i < issues.length; i++) {

        var name = issues[i] + "_button_health";
        console.log(name);
        var elem = document.getElementById(name);

        if(i == num_issue){
            elem.classList.remove("passive");
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
            elem.classList.add("passive");
        }


        var desc = issues[i] + "_description";
        var element = document.getElementById(desc);
        if(i == num_issue){
            element.classList.remove("hide");
            element.classList.add("show");
        } else {
            element.classList.remove("show");
            element.classList.add("hide");
        }

    }


    var pictures = ["image/BPA_Koerper.png",
    "image/Flammschutzmittel_Koerper.png",
    "image/Phthalate_Koerper.png",
    "image/Schwermetalle_Koerper.png"];

    var products = ["image/BPA_Icon_Übersicht.png",
    "image/Flammschutzmittel_Icon_Übersicht.png",
    "image/Phthalate_Icon_Übersicht.png",
    "image/Schwermetalle_Icon_Übersicht.png"];

    if(health_toggle_persistence){
        var picture = document.getElementById("health_issue_picture").src = pictures[num_issue];
    } else {
        var picture = document.getElementById("health_issue_picture").src = products[num_issue];
    }

}

function toggle_health_products(){

    var togglebutton = document.getElementById("health_toggle");
    togglebutton.innerHTML = !health_toggle_persistence ? "Zeige Produkte" : "Zeige Auswirkungen";

    health_toggle_persistence = !health_toggle_persistence;
    console.log("toggle dis, son");
    toggle_health();

}

toggle_health(0);



/* make the slideshow */
function make_slides_from_data() {

    // these are our resources
    var background = "Background.png";

    // these are our parameters
    var w = window.innerWidth;
    var h = window.innerHeight;

    // we start by preparing our scroll boxes, one for each moving layer
    var background_box = document.getElementById('background_box');
    var bubble_box = document.getElementById('bubble_box');
    var image_box = document.getElementById('image_box');
    var text_box = document.getElementById('text_box');

    // set the background
    var background = document.createElement("div");
    background.style.backgroundImage = "url('image/Bubble_Schicht_1.png')";
    background.style.width = w + 'px';
    background.style.height =  (1 / (3840 / w)) * 15120 + 'px';
    background_box.appendChild(background);

    var bubble = document.createElement("div");
    bubble.style.backgroundImage = "url('image/Bubble_Schicht_2.png')";
    bubble.style.width = w + 'px';
    bubble.style.height =  24147/2 + 'px';
    bubble_box.appendChild(bubble);

    // id list
    var ids = ["plastikkugel", "mensch", "groessen", "insel",
    "over_image", "auswirkungen_1", "objekte", "impressum"];

    // loop through our prepared data to generate a slideshow
    var i;

    for(i = 0; i < ids.length; i++){

        // scale the image´s parent div
        var slide_field = document.getElementById(ids[i]);
        console.log("slide_field "+ ids.length);
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
glassMagnifier();
