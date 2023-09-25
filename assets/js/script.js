var srch = $('#btnsearch');


function search(){
    var srchtext = $('#txtseachval').val();
     var srchdrop = $('#drlformat').val();

    location.replace("./SearchResults.html?srchtext=" + srchtext + "&srcdrop=" + srchdrop)
};

srch.on('click', search);

