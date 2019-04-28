const city = document.querySelector('.change-city');
const title = document.querySelector('.showCtg');
const list = document.querySelector('.showzip');
const ticketSel = document.getElementById('ticketFree');
const allTime = document.getElementById('alltime');
const searchBtn = document.getElementById('search');
const searchInput = document.querySelector('.nav-input');
const showBadge = document.querySelector('.badge');
const inputState = document.getElementById('inputState');
const xhr = new XMLHttpRequest();

xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send();
xhr.onload = function section(){
let ogdata = JSON.parse(xhr.responseText);
let calldata = ogdata.result.records;
const kaoZone = [];
for( let i=0 ; i<calldata.length ; i++){
    kaoZone.push(calldata[i].Zone);
    }
    const area =[];
    kaoZone.forEach(function(value) {
    if (area.indexOf(value) == -1) {
        area.push(value);
        }
    });
    let opZone = '<option value="請選擇">請選擇</option>';
    for (let i=0;i<area.length;i++){
        opZone += `<option value="${area[i]}">${area[i]}</option>`;
    }
    inputState.innerHTML=opZone;
}

function showContent(){
    let ticketStr = ticketSel.value;
    let timeStr = allTime.value;
    let searchStr = searchInput.value;
    let str = city.value;
    xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
    xhr.send();
    xhr.onload = function section(){
        let ogdata = JSON.parse(xhr.responseText);
        let calldata = ogdata.result.records;
        let selData = [];
        for( let i=0 ; i<calldata.length ; i++){
            if (str == calldata[i].Zone){
                if ((allTime.checked == true) && (timeStr == calldata[i].Opentime)) {
                    if((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)){
                        selData.push({
                            photo:calldata[i].Picture1,
                            add:calldata[i].Add,
                            name:calldata[i].Name,
                            optime:calldata[i].Opentime,
                            tel:calldata[i].Tel,
                            ticket:calldata[i].Ticketinfo
                        });
                    }
                    else if (ticketSel.checked == false) {
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
                else if ((allTime.checked == false) && (ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)) {
                    selData.push({
                        photo:calldata[i].Picture1,
                        add:calldata[i].Add,
                        name:calldata[i].Name,
                        optime:calldata[i].Opentime,
                        tel:calldata[i].Tel,
                        ticket:calldata[i].Ticketinfo
                    });
                }
                else if ((allTime.checked == false) && (ticketSel.checked == false)) {
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
            else if ((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo) && (str == '請選擇')) {
                if ((allTime.checked == true) && (timeStr == calldata[i].Opentime)) {
                    selData.push({
                        photo:calldata[i].Picture1,
                        add:calldata[i].Add,
                        name:calldata[i].Name,
                        optime:calldata[i].Opentime,
                        tel:calldata[i].Tel,
                        ticket:calldata[i].Ticketinfo
                    });
                }else if (allTime.checked == false) {
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
            else if ((allTime.checked == true) && (timeStr == calldata[i].Opentime) && (str == '請選擇')) {
                if((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)){
                    selData.push({
                        photo:calldata[i].Picture1,
                        add:calldata[i].Add,
                        name:calldata[i].Name,
                        optime:calldata[i].Opentime,
                        tel:calldata[i].Tel,
                        ticket:calldata[i].Ticketinfo
                    });
                }else if (ticketSel.checked == false) {
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
            //Search 功能
            else if((allTime.checked == false) && (ticketSel.checked == false) && (str == '請選擇')) {
                let describe = calldata[i].Toldescribe;
                let seek = describe.indexOf(searchStr); 
                if (seek !== -1) {
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
        }
        
        let content = '';
        let titleStr = '';
        let icon = '';
        for (let i=0;i<selData.length;i++){
            titleStr = `<h4 class="py-3 pl-3 mt-2">為你篩選出 <span class="text-info">${selData.length}</span> 筆資料</h4>`
            if ((ticketSel.checked == true) && (allTime.checked == false)) {
                icon = `<h5><span class="badge badge-pill badge-info">
                ${ticketSel.value}
                </span></h5>`
            }else if ((ticketSel.checked == false) && (allTime.checked == true)) {
                icon = `<h5><span class="badge badge-pill badge-info">
                ${allTime.value}
                </span></h5>`
            }else if ((ticketSel.checked == true) && (allTime.checked == true)) {
                icon = `<h5><span class="badge badge-pill badge-info">
                ${ticketSel.value}
                </span>
                <span class="badge badge-pill badge-info">
                ${allTime.value}
                </span></h5>`
            }
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
        showBadge.innerHTML = icon;
        list.innerHTML = content;
    }
}


searchBtn.addEventListener('click',showContent);
allTime.addEventListener('click',showContent);
ticketSel.addEventListener('click',showContent);
city.addEventListener('change',showContent);