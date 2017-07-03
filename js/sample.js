/**
 * Created by Dad on 7/1/2017.
 */


$(document).ready( function () {

    WorkOrderQueue_Controller.searchOwners(function(result,event){
        if(event.status){

            var userSearchResult =  (result.userList != '') ? jQuery.parseJSON(result.userList) : '';
            var pre_populate_user_list = (result.prePoplateUserList != '') ? jQuery.parseJSON(result.prePoplateUserList) : '';
            // alert("userSearchResult-"+userSearchResult);
            j$("#OwnerSearch").tokenInput(userSearchResult, {
                theme: "facebook",
                preventDuplicates: true,
                tokenDelimiter: "@@",
                hintText: "Please type Owner Name",
                noResultsText: "No Owner found",
                searchingText: "Searching...",
                placeholder: 'Search Owner...',
                prePopulate:pre_populate_user_list
            });
        }
    },{escape:false});

    WorkOrderQueue_Controller.loadSubTypeValues(function(result,event){
        if(event.status){
            var statusResult =    (result.userList != '') ? jQuery.parseJSON(result.userList) : '';
            var pre_populate_user_list = (result.prePoplateUserList != '') ? jQuery.parseJSON(result.prePoplateUserList) : '';
            j$("#subType").tokenInput(statusResult, {
                theme: "facebook",
                preventDuplicates: true,
                tokenDelimiter: "@@",
                hintText: "Please type sub type",
                prePopulate :pre_populate_user_list,
                noResultsText: "No sub type found",
                searchingText: "Searching...",
                placeholder: 'Search type...'
            });

        }
    },{escape:false});

    WorkOrderQueue_Controller.loadPriorityValues(function(result,event){
        if(event.status){
            var statusResult =   (result.userList != '') ? jQuery.parseJSON(result.userList) : '';
            var pre_populate_user_list = (result.prePoplateUserList != '') ? jQuery.parseJSON(result.prePoplateUserList) : '';
            j$("#Priority").tokenInput(statusResult, {
                theme: "facebook",
                preventDuplicates: true,
                tokenDelimiter: "@@",
                hintText: "Please type priority",
                prePopulate :pre_populate_user_list,
                noResultsText: "No priority found",
                searchingText: "Searching...",
                placeholder: 'Search priority...'
            });

        }
    },{escape:false});
});

function searchUsers(userSearch){

    var userSearchResult =   (userSearch!= '') ? jQuery.parseJSON(userSearch) : '';
    j$("#OwnerSearch").tokenInput(userSearchResult, {
        theme: "facebook",
        preventDuplicates: true,
        tokenDelimiter: "@@",
        hintText: "Please type Location",
        noResultsText: "No Locations found",
        searchingText: "Searching...",
        placeholder: 'Search Location...'
    });

}

function searchLocations(){

    var selectionsSelected = j$("#OwnerSearch").val();
    selectionsSelected = (selectionsSelected != '') ? selectionsSelected : '';

    if(selectionsSelected != ''){
        $('.searchWaitingDivOpacity').show();
        setTimeout(SearchLocationsResult,1500);
    }else alert('please select atleast one location');

    return false;
}
function duedateSelected(value){
    document.getElementById("dueSelected").value=value;
}
function SearchLocationsResult(){
    var selectionsSelected = j$("#OwnerSearch").val();
    selectionsSelected = (selectionsSelected != '') ? selectionsSelected : '';

    var selectval=document.getElementById( "StatusSelection" );


    var Priority = j$("#Priority").val();
    Priority = (Priority != '') ? Priority : '';
    var subType = j$("#subType").val();
    subType = (subType != '') ? subType : '';
    var due = document.getElementById("dueSelected").value;
    // alert("due date--"+due);
    workorderCallback(selectionsSelected,Priority,subType,due);

    return false;
}
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
                    $("#rowcount").html("0 Work Orders");
                }else $("#rowcount").html(numberOfRows + " Work Order");
            }
            else{
                $("#rowcount").html(numberOfRows + " Work Orders");
            }

            var api = this.api();


            var select = j$('[id$=typeSelect]');
            api.column(8).data().unique().sort().each( function ( d, j ) {
                if(d != ''){
                    select.append( '<option value="'+ d +'">'+ d +'</option>' )
                }
            } );

        }

    });

    var info = implementationtable.page.info();
    console.log(info);


    j$('[id$=typeSelect]').change(function() {
        var val = j$.fn.dataTable.util.escapeRegex(
            j$(this).val()
        );
        implementationtable.column(8)
            .search( val == 'All' ? '' : '^'+val+'$', true, false )
            .draw();
        var numberOfRows = $('#implementationtable tbody tr').size();
        if(numberOfRows == 1){
            $("#rowcount").html(numberOfRows + " Work Order");
        }
        else{
            $("#rowcount").html(numberOfRows + " Work Orders");
        }
        var info = implementationtable.page.info();
        records = info.recordsDisplay;
        alert("records--"+records);
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
            $("#rowcount").html(rec + " Work Order");
        }
        else{
            $("#rowcount").html(rec + " Work Orders");
        }

    } );

    j$('[id$=myinput]').on("search", function(){
        implementationtable.search('').draw();
        var info = implementationtable.page.info();
        rec = info.recordsDisplay;
        console.log(rec);

        if(rec == 1){
            $("#rowcount").html(rec + " Work Order");
        }
        else{
            $("#rowcount").html(rec + " Work Orders");
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
                $("#rowcount").html(numberOfRows + " Work Order");
            }
            else{
                $("#rowcount").html(numberOfRows + " Work Orders");
            }


        }

    });


} );

function warnNoneSelected(receivedInputID)
{
    var inputCheckBox = document.getElementsByTagName( "input" );
    for ( var i = 0; i < inputCheckBox.length; i++ )
    {
        if ( inputCheckBox[ i ].id.indexOf( receivedInputID ) != -1 )
        {
            if ( inputCheckBox[ i ].checked )
            {
                return true;
            }
        }
    }
    window.alert('No records selected.');
    return false;
}

function checkReassign(ownerId)
{
    if(ownerId == null || ownerId =='')
    {
        window.alert('No records selected.');
        return false;
    }
    else
    {

        if(!window.confirm('Work order has been transferred'))
        {
            return false;
        }
    }

    return true;
}