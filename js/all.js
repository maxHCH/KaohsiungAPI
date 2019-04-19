const city = document.querySelector('.change-city');

function selCity(){
    let str = [];
    str.County = city.value;
    const xhr = new XMLHttpRequest();
    xhr.get('get','https://obscure-crag-88418.herokuapp.com/travel',true);
    let data = JSON.stringify(str);
    xhr.send(data);
    xhr.onload = function(){
        console.log(xhr.responseText);
    }
}


city.addEventListener('change',selCity);