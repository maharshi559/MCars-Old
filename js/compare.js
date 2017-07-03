/**
 * Created by Dad on 7/1/2017.
 */
j$ = jQuery.noConflict();
j$(document).ready( function () {
    var implementationtable= j$('[id$="implementationtable"]').DataTable({
        orderClasses : false,
        bPaginate: false,
        bInfo: false,
        fixedHeader: {
            header: true,
            footer: false,
        },
        scrollY: 400,
        order: [[2, 'asc']],

        initComplete: function() {

            var numberOfRows = $('#implementationtable tbody tr').size();

            if(numberOfRows == 1){
                if($('#implementationtable tbody tr').find('td').hasClass( "dataTables_empty")){
                    $("#rowcount").html("0 Implementations");
                }else $("#rowcount").html(numberOfRows + " Implementation");
            }else{
                $("#rowcount").html(numberOfRows + " Implementations");
            }

            var api = this.api();


            var select = j$('[id$=siteSelect]');
            api.column(3).data().unique().sort().each( function ( d, j ) {
                if(d != ''){
                    select.append( '<option value="'+ d +'">'+ d +'</option>' )
                }
                else if(d == ''){
                    select.append( '<option value="'+ d +'">'+ 'Site Not Assigned' +'</option>' )
                }
            } );

        }

    });

    var info = implementationtable.page.info();
    console.log(info);


    j$('[id$=siteSelect]').change(function() {
        var val = j$.fn.dataTable.util.escapeRegex(
            j$(this).val()
        );
        implementationtable.column(3)
            .search( val == 'All' ? '' : '^'+val+'$', true, false )
            .draw();
        var numberOfRows = $('#implementationtable tbody tr').size();
        if(numberOfRows == 1){
            $("#rowcount").html(numberOfRows + " Implementation");
        }
        else{
            $("#rowcount").html(numberOfRows + " Implementations");
        }
        var info = implementationtable.page.info();
        records = info.recordsDisplay;
        console.log(records );


    });


    j$('[id$=myClass').on( 'keyup', function () {
        alert('Test');
    } );

    j$('[id$=myinput').on( 'keyup', function () {

        implementationtable.search( this.value ).draw();

        var info = implementationtable.page.info();
        rec = info.recordsDisplay;
        if(rec == 1){
            $("#rowcount").html(rec + " Implementation");
        }
        else{
            $("#rowcount").html(rec + " Implementations");
        }

    } );

    j$('[id$=myinput]').on("search", function(){
        implementationtable.search('').draw();
        var info = implementationtable.page.info();
        rec = info.recordsDisplay;
        console.log(rec);

        if(rec == 1){
            $("#rowcount").html(rec + " Implementation");
        }
        else{
            $("#rowcount").html(rec + " Implementations");
        }
    } );

    document.getElementById("filters").style.display = "none";
    document.getElementById("cmdl1").style.display = "block";


    j$('#implementationtable_filter input').addClass('myclass');



});


window.onload = function(){
    hideFilters();
}


function showFilters(){
    document.getElementById("filters").style.display = "block";
    document.getElementById("cmdl1").style.display = "none";
    document.getElementById("cmdl2").style.display = "block";
}

function hideFilters(){
    document.getElementById("filters").style.display = "none";
    document.getElementById("cmdl1").style.display = "block";
    document.getElementById("cmdl2").style.display = "none";
}

$(window).on('resize', function () {
    var implementationtable= j$('[id$="implementationtable"]').DataTable({
        orderClasses : false,
        bPaginate: false,
        bInfo: false,
        fixedHeader: {
            header: true,
            footer: false,
        },
        scrollY: 400,
        destroy: true,
        order: [[2, 'asc']],

        initComplete: function() {
            var numberOfRows = $('#implementationtable tbody tr').size();
            if(numberOfRows == 1){
                $("#rowcount").html(numberOfRows + " Implementation");
            }
            else{
                $("#rowcount").html(numberOfRows + " Implementations");
            }


        }

    });


} );

