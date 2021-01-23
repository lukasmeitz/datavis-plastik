
/* make page pretty */
//document.body.style.overflow = 'hidden';

var scroll_lock = false;


/* handle the scrolling stuffs */
var offset = 0;
window.addEventListener('wheel', function(event)
{

    // these are our parameters
    var w = window.innerWidth;
    var h = window.innerHeight;

    //event.preventDefault();
    //event.stopPropagation();

    //scrolling(event.deltaY);

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

    offset -= event.deltaY * 40;
    /*if(deltaY > 0) {
        offset -= window.innerHeight;
    } else {
        offset += window.innerHeight;
    }*/

    if(offset > 0) {
        offset = 0;
        return;
    }

    let page_number = Math.round(-1 * offset / window.innerHeight);

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

    for(var i=0; i <= 8; i++){
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
    for(let i=0; i <= 8; i++){
        let elem = document.getElementById(i+"");

        if(elem.classList.contains("active")){
            deltaY = page_number - i ;
        }
    }

    for(let j = 0; j < Math.abs(deltaY) ; j++){
        scrolling(deltaY, locking=false);
    }


}




/* handle the indirect/direct contact info screen */
function display_direct(num){

    var images = ["new_images/fourth/1.Kasten.png",
        "new_images/fourth/2.Kasten.png",
        "new_images/fourth/3.Kasten.png",
        "new_images/fourth/4.Kasten.png"];

    var element = document.getElementById("direct_info");
    element.src = images[num];


    for(var i = 0; i < 4; i++) {

        var name = "direct_" + (i+1);
        var elem = document.getElementById(name);
        var name_extension = i == num ? "_aktiv.png" : ".png";

        elem.src = "new_images/fourth/direkt_" + (i+1) + name_extension;

    }

}

function display_indirect(num){

    var images = ["new_images/fourth/6.Kasten.png",
        "new_images/fourth/7.Kasten.png",
        "new_images/fourth/5.Kasten.png"];

    var element = document.getElementById("indirect_info");
    element.src = images[num];


    for(var i = 0; i < 3; i++) {

        var name = "indirect_" + (i+1);
        var elem = document.getElementById(name);
        var name_extension = i == num ? "_aktiv.png" : ".png";

        elem.src = "new_images/fourth/indirekt_" + (i+1) + name_extension;

    }

}




/* Handle the magnifying glass interaction */
function glassMagnifier() {
    var isGlassSelected = false;
    var glass = document.getElementById("glass");
    var glass_img = document.getElementById("magnifier-glass");
    var text_img = document.getElementById("magnifier-text");
    var ende_Screen = document.getElementById("objekte");
    var particle_image = document.getElementById("particle_image");

    glass.addEventListener("mousedown", function (e) {
        e.preventDefault();
        isGlassSelected = true;
    });
    glass.addEventListener("mousemove", moveMagnifier);
    ende_Screen.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("mouseup", function (e) {
        e.preventDefault();
        isGlassSelected = false;
    });

    function moveMagnifier(event) {
        let pos, x, y;
        event.preventDefault();

        if(isGlassSelected){
            pos = getCursorPos(event, ende_Screen);

            x = pos.x;
            y = pos.y;


            moveMagnifier_for_real_now(x, y);
        }
    }

    function moveMagnifier_for_real_now(x, y) {

        let w = glass_img.offsetWidth / 2;
        let h = glass_img.offsetHeight / 2;

        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > ende_Screen.width - (w / 3)) {x = ende_Screen.width - (w / 3);}
        if (x < w / 4) {x = w / 4;}
        if (y > ende_Screen.height - (h / 3)) {y = ende_Screen.height - (h / 3);}
        if (y < h/4) {y = h / 4;}

        /*set the position of the magnifier glass:*/
        glass_img.style.left = ((x - w)-100) + "px";
        glass_img.style.top = ((y - h)-90) + "px";

        /* set the position of the text to follow the glass */
        text_img.style.left = (x-180) + "px";
        text_img.style.top = (y-420) + "px";

        //cir_red.style.left = x + "px";
        //cir_red.style.top = y+ "px";
        particle_clipping(x, y, particle_image);

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

    function particle_clipping(x_1, y_1, particle_image){
        var x = x_1-140;
        var y = y_1-30;
        particle_image.style =  "position: absolute; bottom: 0; width: 100%; clip-path: circle(130px at "+x+"px "+y+"px);";

    }

    moveMagnifier_for_real_now(760, 560);

}



/* handle the health issue info view */
var num_issue_persistence = 0;
var health_toggle_persistence = true;

function toggle_health(num_issue = -1) {


    // handle the persistence thing
    // if no number is provided, use the one that has been saved last time
    if(num_issue == -1){
        num_issue = num_issue_persistence;
    } else {
        num_issue_persistence = num_issue;
    }

    var issues = ["bpa", "fsm", "pht", "hm"];
    var colors = ["#373450", "#373450", "#373450", "#373450"];

    var buttons = ["new_images/sixth/Bisphenol.png",
                    "new_images/sixth/Flammschutzmittel.png",
                    "new_images/sixth/Phthalate.png",
                    "new_images/sixth/Schwermetalle.png"];

    var buttons_aktiv = ["new_images/sixth/Bisphenol_aktiv.png",
                    "new_images/sixth/Flammschutzmittel_aktiv.png",
                    "new_images/sixth/Phthalate_aktiv.png",
                    "new_images/sixth/Schwermetalle_aktiv.png"];

    // not used any more: this was part of changing the textbox background
    console.log("issue is: " + issues[num_issue]);
    document.getElementById("health_info_box").style.backgroundColor = colors[num_issue];

    // loop over all four available chemical buttons and change the active/passive state
    for(var i = 0; i < issues.length; i++) {

        var name = issues[i] + "_button_health";
        var elem = document.getElementById(name);

        if(i == num_issue){
            // case true: this is the button that was pressed
            elem.childNodes[0].src = buttons_aktiv[i];
        } else {
            // case false: this is a button that is passive, but has probably been active before. re-render to be sure
            elem.childNodes[0].src = buttons[i];
        }


        var desc = issues[i] + "_description";
        var element = document.getElementById(desc);
        element.parentElement.scrollTop = 0;
        if(i == num_issue){
            element.classList.remove("hide");
            element.classList.add("show");
        } else {
            element.classList.remove("show");
            element.classList.add("hide");
        }

    }


    // these are hardcoded paths to the image sources
    var pictures = ["new_images/sixth/Beschriftung_BPA.png",
    "new_images/sixth/Beschriftung_Flammschutzmittel.png",
    "new_images/sixth/Beschriftung_Phthalate.png",
    "new_images/sixth/Beschriftung_Schwermetalle.png"];

    var products = ["new_images/sixth/Icons Bisphenol A.png",
    "new_images/sixth/Icons Flammschutzmittel.png",
    "new_images/sixth/Icons Phthalate.png",
    "new_images/sixth/Icons Schwermetalle.png"];

    var labels = ["new_images/sixth/Box_BPA_Kunststoffarten.png",
    "new_images/sixth/Box_Flammschutzmittel.png",
    "new_images/sixth/Box_Phthalate.png",
    "new_images/sixth/Box_Schwermetalle.png"];


    if(health_toggle_persistence){
        // case 1: we want to see the persons and health issues
        document.getElementById("health_issue_picture").src = pictures[num_issue];
    } else {
        //case two: we want to see the products
        document.getElementById("health_issue_picture").src = products[num_issue];
    }

    // in any case: we want to show the correct info label on the top right corner
        document.getElementById("health_label").src = labels[num_issue];

}

function toggle_health_products(){

    var togglebutton = document.getElementById("health_toggle");
    togglebutton.src = !health_toggle_persistence ? "new_images/sixth/Button_Auswirkungen.png" : "new_images/sixth/Button_Produkte.png";

    // here the toggle logic is set
    health_toggle_persistence = !health_toggle_persistence;

    // toggle_health is called by the buttons to change the shown content
    // in this case, we just want to reload the page because product view has been toggled
    toggle_health();

}



function toggle_contact(num_issue) {

    var issues = ["atmung", "verzehr", "hautkontakt"];

    var buttons = ["new_images/fifth/Atmung.png",
                   "new_images/fifth/Verzehr.png",
                   "new_images/fifth/Hautkontakt.png"];

    var buttons_aktiv = ["new_images/fifth/Atmung_ausgewählt.png",
                    "new_images/fifth/Verzehr_ausgewählt.png",
                    "new_images/fifth/Hautkontakt_ausgewählt.png"];


    var descriptions = ["new_images/fifth/Atmung_beschreibung.png",
                    "new_images/fifth/Verzehr_beschreibung.png",
                    "new_images/fifth/Hautkontakt_beschreibung.png"];

    var icons = ["new_images/fifth/Icons_Atmen.png",
                    "new_images/fifth/Icons_Verzehr.png",
                    "new_images/fifth/Icons_Hautkontakt.png"];


    // loop over all four available chemical buttons and change the active/passive state
    for(var i = 0; i < issues.length; i++) {

        var name = issues[i] + "_contact";
        var elem = document.getElementById(name);

        var anim = document.getElementById("animation_" + i);

        if(i == num_issue){
            // case true: this is the button that was pressed
            elem.childNodes[1].src = buttons_aktiv[i];
            console.log(elem.childNodes);

            anim.classList.remove("hide");
            anim.classList.add("show");

        } else {
            // case false: this is a button that is passive, but has probably been active before. re-render to be sure
            elem.childNodes[1].src = buttons[i];

            anim.classList.remove("show");
            anim.classList.add("hide");
        }

    }


    document.getElementById("contact_description").src = descriptions[num_issue];

    document.getElementById("contact_icons").src = icons[num_issue];



}




// initialize
display_direct(0);
display_indirect(0);
toggle_health(0);
toggle_contact(0);
glassMagnifier();


