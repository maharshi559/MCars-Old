/**
 * Created by Dad on 7/1/2017.
 */

$(document).ready(function () {
    
    var status = document.getElementsByClassName(status);
    // var statusContent = status.innerText;
    // console.log(statusContent);

        // $('#table td.status').each(function() {
        //     if ($(this).text() == 'Booked') {
        //         $(this).css('background-color', '#000');
        //     }
        // });
        console.log($(status).text);
    if($(status).text == "Booked"){
        $(this).css('background-color', '#000');
    }
    else {
        $(this).css('background-color', '#000');
    }

});

//$(document).ready(function(){
//     $("#table_id td.y_n:contains('N')").css('background-color','#fcc');
// });
// <table id="table_id">
// <tr><th>Question</th><th>Y/N?</th></tr>
// <tr><td>I am me.</td><td class="y_n">Y</td></tr>
//     <tr><td>I am him.</td><td class="y_n">N</td></tr>
//     <tr><td>I am not sure.</td><td class="y_n">Y</td></tr>
//     <tr><td>This is a table.</td><td class="y_n">Y</td></tr>
//     </table>
//
//     </body>
//     </html>