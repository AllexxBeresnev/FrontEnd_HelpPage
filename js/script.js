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
        let rows = csv.split("\n");
        for (let i = 0; i < rows.length; i++) {  //основной пробег по строкам
            str = rows[i];
//            console.log(str);          
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

//                console.log(str, title);        
/*---------------------------*/
//Далее вытаскиваем Link
                link = "";
                for (let j = 0; j < str.length; j++) { // пробег по бувам
                    if (str[j] != ","){
                        link = link+str[j];
                    } else {break}               

                    }
                console.log(tab, title, link);        
            }
  //          console.log(str_split, str_split.length, count);
        }




makeTree();

});


