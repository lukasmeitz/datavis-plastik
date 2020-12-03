
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

     var mouseover_div_ids = [["div_mouseover1","div_mouseout1"],["div_mouseover2","div_mouseout2"],["div_mouseover3","div_mouseout3"]];
    var mouseout_div_ids = [["div_mouseout1","div_mouseover1"], ["div_mouseout2","div_mouseover2"],["div_mouseout3","div_mouseover3"]];


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
    background.style.backgroundImage = "url('image/Background.png')";
    background.style.width = '100%';
    background.style.height = '5760px';
    background_box.appendChild(background);


    // loop through our prepared data to generate a slideshow
    var i;
    for(i = 0; i < data.length; i++){

        if(i == 3){
            var row1 = document.getElementById('row1');
            var row2 = document.getElementById('row2');

            row2.style.display ="flex";
            image_box.appendChild(row2);
            row1.style.display ="flex";
            text_box.appendChild(row1);
        }
        else{
            // create a background slide element
            var slide_field = document.createElement("div");
            slide_field.style.backgroundImage = "url('image/" + images[i] + "')";
            slide_field.style.width = w + 'px';
            slide_field.style.height = h + 'px';
            image_box.appendChild(slide_field);

            // create a text field element in the overlay
            var text_field = document.createElement("div");
            text_field.innerHTML = data[i];
            text_field.style.width = w + 'px';
            if( i == 0) {
                text_field.style.height = (h * 0.25 ) + 'px';
            } else {
                text_field.style.height = (h * 0.5) + 'px';
            }
            text_box.appendChild(text_field);
        }

        /*
        *********************** New Code
        the Javascript code for mouseOver and mouseout from element in DIV
         */
        let row = document.getElementById('div_mouseover');

        document.getElementById('div_mouseover1').addEventListener("mousemove",
            function(){mouseOverAndOut("div_mouseover1","div_mouseout1");} );
        document.getElementById('div_mouseover2').addEventListener("mousemove",
            function(){mouseOverAndOut("div_mouseover2","div_mouseout2");} );
        document.getElementById('div_mouseover3').addEventListener("mousemove",
            function(){mouseOverAndOut("div_mouseover3","div_mouseout3");} );
        document.getElementById('div_mouseout1').addEventListener("mouseout",
            function(){mouseOverAndOut("div_mouseout1","div_mouseover1");} );
        document.getElementById('div_mouseout2').addEventListener("mouseout",
            function(){mouseOverAndOut("div_mouseout2","div_mouseover2");} );
        document.getElementById('div_mouseout3').addEventListener("mouseout",
            function(){mouseOverAndOut("div_mouseout3","div_mouseover3");} );

        row.style.display ="flex";
        image_box.appendChild(row);

        function mouseOverAndOut(over_div, out_div) {
            document.getElementById(""+over_div+"").style.display ="none";
            document.getElementById(""+out_div+"").style.display ="flex";
        }

        /*
        var i =0, j=0;
        for(i = 0; i < mouseover_div_ids.length; i++){
            var tmp = mouseout_div_ids[i];
            document.getElementById(mouseover_div_ids[i][0]+'').addEventListener("mousemove",
                function(){
                    console.log(mouseover_div_ids);
                    mouseOver(mouseover_div_ids[i][0]+"",mouseover_div_ids[i][1]+"");
            } );
        }
        for(j = 0; j < mouseout_div_ids.length; j++){
            document.getElementById(mouseout_div_ids[j][0]+'').addEventListener("mouseout",
                function(){
                    var k = j;
                    mouseOver(mouseout_div_ids[j][0]+"",mouseout_div_ids[j][1]+"");
            } );
        }*/





    }

}

make_slides_from_data();
