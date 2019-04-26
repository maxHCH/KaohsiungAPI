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

function reset() {
    xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel',true);
    xhr.send();
    xhr.onload = function set(){
    let calldata = JSON.parse(xhr.responseText);
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
        let opZone = '<option value="1">請選擇</option>';
        for (let i=0;i<area.length;i++){
            opZone += `<option value="${area[i]}">${area[i]}</option>`;
        }
        inputState.innerHTML=opZone;
    }
}
reset()

function Option(e){
    reset()
    let selData = [];
    if((ticketSel.checked == true) &&(allTime.checked == false)){
        if(city.value !== '1') {
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Ticketinfo='+ticketSel.value+'&'+'Zone='+inputState.value,true);
            xhr.send();
        }else{
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Ticketinfo='+ticketSel.value,true);
            xhr.send();
            
        }
    }else if ((ticketSel.checked == false) &&(allTime.checked == true)){
        if(city.value !== '1') {
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Opentime='+allTime.value+'&'+'Zone='+inputState.value,true);
            xhr.send();
        }else{
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Opentime='+allTime.value,true);
            xhr.send();
        }
    }else if ((ticketSel.checked == true)&&(allTime.checked == true)){
        if(city.value !== '1') {
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Ticketinfo='+ticketSel.value+'&'+'Opentime='+allTime.value+'&'+'Zone='+inputState.value,true);
            xhr.send();
        }else{
            xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Ticketinfo='+ticketSel.value+'&'+'Opentime='+allTime.value,true);
            xhr.send();
        }
    }else {
        xhr.open('get','https://obscure-crag-88418.herokuapp.com/travel?Zone='+inputState.value,true);
        xhr.send();
    }
    xhr.onload = function addData(){
        let Data = JSON.parse(xhr.responseText);
        for (let i=0;i<Data.length;i++){
            selData.push({
                photo:Data[i].Picture1,
                add:Data[i].Add,
                name:Data[i].Name,
                optime:Data[i].Opentime,
                tel:Data[i].Tel,
                ticket:Data[i].Ticketinfo
            });
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
    searchBtn.addEventListener('click',Option);
    allTime.addEventListener('click',Option);
    ticketSel.addEventListener('click',Option);
    city.addEventListener('change',Option);
    


            // if (str == calldata[i].Zone){
            //     if ((allTime.checked == true) && (timeStr == calldata[i].Opentime)) {
            //         if((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)){
            //             selData.push({
            //                 photo:calldata[i].Picture1,
            //                 add:calldata[i].Add,
            //                 name:calldata[i].Name,
            //                 optime:calldata[i].Opentime,
            //                 tel:calldata[i].Tel,
            //                 ticket:calldata[i].Ticketinfo
            //             });
            //         }
            //         else if (ticketSel.checked == false) {
            //             selData.push({
            //                 photo:calldata[i].Picture1,
            //                 add:calldata[i].Add,
            //                 name:calldata[i].Name,
            //                 optime:calldata[i].Opentime,
            //                 tel:calldata[i].Tel,
            //                 ticket:calldata[i].Ticketinfo
            //             });
            //         }
            //     }
            //     else if ((allTime.checked == false) && (ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }
            //     else if ((allTime.checked == false) && (ticketSel.checked == false)) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }
            // }
            // else if ((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo) && (str == '請選擇')) {
            //     if ((allTime.checked == true) && (timeStr == calldata[i].Opentime)) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }else if (allTime.checked == false) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }
            // }
            // else if ((allTime.checked == true) && (timeStr == calldata[i].Opentime) && (str == '請選擇')) {
            //     if((ticketSel.checked == true) && (ticketStr == calldata[i].Ticketinfo)){
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }else if (ticketSel.checked == false) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }    
            // }
            // //Search 功能
            // else if((allTime.checked == false) && (ticketSel.checked == false) && (str == '請選擇')) {
            //     let describe = calldata[i].Toldescribe;
            //     let seek = describe.indexOf(searchStr); 
            //     if (seek !== -1) {
            //         selData.push({
            //             photo:calldata[i].Picture1,
            //             add:calldata[i].Add,
            //             name:calldata[i].Name,
            //             optime:calldata[i].Opentime,
            //             tel:calldata[i].Tel,
            //             ticket:calldata[i].Ticketinfo
            //         });
            //     }
            // }