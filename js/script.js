"use strict";

window.addEventListener("DOMContentLoaded", () => {

//              ОТКЛАДЫВАЕТСЯ НА НЕОПРЕДЕЛЕННОЕ ВРЕМЯ - ПОКА ЗНАНИЙ НЕТ


//*************************** */
//Формирование внешнего вида на основе JSON файла
//*************************** */

//    function makeTree() {

//Считать с БД содержимое для отрисовки объектов из JSON

/*         const request = new XMLHttpRequest();
        request.open('GET','http://localhost:3000/mainlines');
        request.setRequestHeader("Content-type","application/json; charset=utf-8");
        request.send();
        request.addEventListener("readystatechange", function(){
            if (request.readyState == 4 && request.status == 200) {
                let data = JSON.parse(request.response);
                console.log(data);
                data.forEach(item => {
                    if (item.parent == 0) {
                        let mainLi = document.createElement('li');
                        mainLi.classList.add('tree__branch');
                        mainLi.classList.add('tree__branch-show');
                        mainLi.classList.add('tree_mainItems');
                        mainLi.innerHTML = `
                            <span>${item.title}</span>
                        `;
                          let parent = document.querySelector('.tree');
                        parent.appendChild(mainLi);
                        console.log(parent);

                    }
            })
            } else {console.error('Что-то пошло не так');}
    });
    } */
//makeTree();

//Навешиваем событие на клик по ветке дерева
//Должны показываться только дочерние элементы к нему
let branch = document.querySelectorAll(".tree__branch");
//Пробегаемся по всем элементам
branch.forEach(function(elem){
    elem.addEventListener("click", function(event){
        event.stopImmediatePropagation();
// найти всех соседних в цикле
        let sibling = event.target;
//        console.log(sibling);
        while (sibling.nextSibling) {
            sibling = sibling.nextSibling;
//            console.log(sibling);
//сразу меняем класс            
            sibling.nodeType ==1 && sibling.classList.toggle("tree__branch-show");            

}
    })
});

//Кнопка Развернуть/Свернуть
let expand = document.querySelector(".expand__button");
expand.addEventListener("click", () => {
    if (expand.innerHTML == "Развернуть") {
        expand.innerHTML="Свернуть";
        branch.forEach( (elem) => {
            elem.classList.add("tree__branch-show");
        })
    } else {
        expand.innerHTML="Развернуть";
        //не трогать корневые ветки дерева
        branch.forEach( (elem) => {
            if (!elem.classList.contains('tree_mainItems')) {
                elem.classList.remove("tree__branch-show");                
            }

        })
    }

});
//--  the end  --Кнопка Развернуть/Свернуть

});


