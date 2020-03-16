"use strict";

window.addEventListener("DOMContentLoaded", () => {


//*************************** */
//Формирование внешнего вида на основе CSV файла
//*************************** */

    function makeTree() {



        const request = new XMLHttpRequest();
        request.open('GET','https://docs.google.com/spreadsheets/d/e/2PACX-1vSoZrr42llkXGHBUOH-pNtGSwDeKlYZlL2qApXUaw0FFrqUeFNgxnn_rICX1lwgPlHDhuRRT55Z9jy3/pub?gid=0&single=true&output=csv');
        request.setRequestHeader("Content-type","application/json; charset=utf-8");
        request.send();
        request.addEventListener("readystatechange", function(){
            if (request.readyState == 4 && request.status == 200) {
// преобразование CSV в объект JS

            csvToWindow(request.response)
            } else {console.error('Что-то пошло не так');}
    });
    } 


//должен получиться массив со строками с полями
// "count": n - количество отступов
// "title": "xxxx" заголовок строки
// "link":  "http...."  ссылка на источник

    function csvToWindow(csv){
        let str, 
            title,
            link,
            tab;  //для количества отступов
        let parent;
        let parentID;
        let rows = csv.split("\n");
        for (let i = 0; i < rows.length; i++) {  //основной пробег по строкам
            str = rows[i];
            let isParent = 0;
// как ослеживать дочерние дивы            
// на каждой строке определять родительский ли это блок

/*---------------------------*/
/*Первым проходом находим количество табов*/
            tab = 0;  
            for (let j = 0; j < str.length; j++) { // пробег по бувам
                if (str[j]== ","){
                    tab++;
                } else {break}               

                }
                //отсекаем первые запятые
                str = str.substr(tab, str.length);
/*---------------------------*/

//Далее вытаскиваем Title
            title = "";
            for (let j = 0; j < str.length; j++) { // пробег по бувам
                if (str[j] != ","){
                    title = title+str[j];
                } else {break}               

                }
            //отсекаем Title
            str = str.substr(title.length+1, str.length);

/*---------------------------*/
//Далее вытаскиваем Link
            link = "";
            for (let j = 0; j < str.length; j++) { // пробег по бувам
                if (str[j] != ","){
                    link = link+str[j];
                } else {break}               

                }
/*---------------------------*/
/*   Прорисовка блоков на странице*/
                console.log(tab, title, link);

//                if (tab == 0){//Если блок корневой то
//                    parent = document.querySelector('.tree'); 
//                } else {
//                parent = document.querySelector(`#id${parentID}`); 
//                }

                parent = document.querySelector('.tree'); 

                let newDiv = document.createElement('div');
                //проверка на отстуупы для добалвние класса
                let col = "";
                let show = "";
                if (tab != 0){ //если не корневые ветки дерева
                    col =`col${tab+1}`;
                } else {    //если корневые ветки дерева
                    col ='col1'
                    show = '-show';
                };
                newDiv.classList.add(col)
                //-------------------------------
                //В зависимости от типа ветка или лист
                if (link != "") {   //Если ссылка есть, то лист
//                    newDiv.classList.add('tree__leaf');
// Ссылка на родителя                    
                    newDiv.innerHTML = `<div class="tree__leaf ${col}"><a href="${link}" class="tree__link">${title}</a></div>`;
                } else {
//                    newDiv.classList.add('tree__branch');   
//                    console.log(parentID,oldParentID);
//                    parentID++;
                    newDiv.innerHTML = `<div class="tree__branch${show} ${col}"><span class="title">${title}</span></div>`;
                }
                parent.appendChild(newDiv);
//                console.log(parentID,oldParentID);

//                console.log(col);     

            }

// второй пробег по строкам

        }

    makeTree();

//Кнопка Развернуть/Свернуть
    let expand = document.querySelector(".expand__button");

    expand.addEventListener("click", () => {
        console.log('123');
        let branch = document.querySelectorAll(".tree__branch");
        let leafs = document.querySelectorAll(".tree__leaf");
        console.log(branch);
        console.log(leafs);
            
        if (expand.innerHTML == "Развернуть") {
            expand.innerHTML="Свернуть";
            branch.forEach( (elem) => {
                elem.classList.add("tree__branch-show");
            })
            leafs.forEach( (elem) => {
                elem.classList.add("tree__leaf-show");
            })

        } else {
            expand.innerHTML="Развернуть";
            //не трогать корневые ветки дерева
            branch.forEach( (elem) => {
                if (!elem.classList.contains('tree_mainItems')) {
                    elem.classList.remove("tree__branch-show");                
                }
            leafs.forEach( (elem) => {
                    elem.classList.remove("tree__leaf-show");                
            });
            });
    }
    });

    //Пробегаемся по всем элементам
    let branch = document.querySelectorAll(".tree__branch");
    let leafs = document.querySelectorAll(".tree__leaf");

    branch.forEach(function(elem){
        elem.addEventListener("click", function(event){
            event.stopImmediatePropagation();
    // найти всех уровнем ниже

        elem.classList.toggle("tree__branch-show");            
         });
    });



});


