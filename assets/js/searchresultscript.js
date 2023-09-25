var srch = document.getElementById('btnsearch');
var divpar = document.getElementById('resultdiv');


function search(){
    var srchtext = $('#txtseachval').val();
    var srchdrop = $('#drlformat').val();

    if (srchdrop == 'select'){
        lookupinformation('https://www.loc.gov/search/?q=' + srchtext + '&fo=json')
    }else{
        lookupinformation('https://www.loc.gov/search/' + srchdrop   +'?q=' + srchtext + '&fo=json')
    }
     
};

function lookupinformation(requestUrl){

  fetch(requestUrl)
  .then(function (response) {
    console.log(response.status)
    if (response.status !== 200) {
      alert(response.status)
    } 
    return response.json();  
  })
  .then(function (data) {
   console.log(data)
  
   for (var i = 0; i < data.results.length; i++) {
      var rowdiv = document.createElement('div');
      rowdiv.classList.add("row")
      var carddiv = document.createElement('div');
      carddiv.classList.add("card")
      var header1 = document.createElement('h3')
      var tdate = document.createElement('h5')
      var para = document.createElement('span');

      header1.textContent = data.results[i].title;
      tdate.textContent = dayjs(data.results[i].timestamp).format("MM/DD/YYYY")
      para.textContent = data.results[i].description;
      
      carddiv.appendChild(header1);
      carddiv.appendChild(tdate);
      carddiv.appendChild(para);
      rowdiv.appendChild(carddiv);
      divpar.appendChild(rowdiv)
    }
 });
}






function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function init(){
    
    var qrytext = getParameterByName('srchtext');
    var qrydrop = getParameterByName('srcdrop');
 
    $('#txtseachval').val(qrytext);
    $('#drlformat').val(qrydrop);

    search();

}


init();

srch.addEventListener('click', search);