const city = document.querySelector('.change-city');

function selCity(){
    let str = [];
    str.County = city.value;
    const xhr = new XMLHttpRequest();
    xhr.open('post','https://json2jsonp.com/?url=https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=CWB-BF7B2448-C0EB-4CF4-B028-A16209EFDC55&format=JSON&locationName=',true);
    xhr.setRequestHeader('Content-type','application/json');
    let data = JSON.stringify(str);
    xhr.send(data);
    xhr.onload = function(){
        console.log(xhr.responseText);
    }
}


city.addEventListener('change',selCity);