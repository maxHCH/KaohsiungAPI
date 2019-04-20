const city = document.querySelector('.change-city');
const title = document.querySelector('.showCtg');
const list = document.querySelector('.showzip');
const ticketSel = document.getElementById('ticketFree');

function showContent(){
    let str = city.value;
    let ticketStr = ticketSel.value;
    const xhr = new XMLHttpRequest();
    xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel',true);
    let data = JSON.stringify(str);
    xhr.send(data && ticketStr);
    xhr.onload = function(){
        let calldata = JSON.parse(xhr.responseText);
        let selData = [];
        for( let i=0 ; i<calldata.length;i++){
            if (str == calldata[i].Zone || ticketStr == calldata[i].Ticketinfo){
                selData.push({
                    photo:calldata[i].Picture1,
                    add:calldata[i].Add,
                    name:calldata[i].Name,
                    optime:calldata[i].Opentime,
                    tel:calldata[i].Tel,
                    ticket:calldata[i].Ticketinfo
                });
            }
        }
        let content = '';
        let titleStr = '';
        for (let i=0;i<selData.length;i++){
            titleStr = `<h4 class="py-3 pl-3 mt-2">為你篩選出 <span class="text-info">${selData.length}</span> 筆資料</h4>`
            content += `
                <div class="row py-4 pl-3">
                    <div class="col-lg-4">
                    <div style="background-image:url(${selData[i].photo})"; class="bg-cover">
                    </div>
                    </div>
                    <div class="col-lg-8 mt-3">
                        <div class="h5 text-primary">${selData[i].name}</div>
                        <div class="list-font text-secondary mt-1"><i class="fas fa-map-marker-alt mr-2"></i>${selData[i].add}</div>
                        <div class="list-font text-secondary mt-1"><i class="fas fa-phone mr-2"></i>${selData[i].tel}</div>
                        <div class="list-font text-secondary mt-1"><i class="fas fa-clock mr-2"></i>${selData[i].optime}</div>
                        <div class="list-font text-secondary"><i class="fas fa-ticket-alt mr-2"></i>${selData[i].ticket}</div>
                </div>
                </div>
            `
        }
        title.innerHTML = titleStr;
        list.innerHTML = content;
    }
}

ticketSel.addEventListener('click',showContent);
city.addEventListener('change',showContent);