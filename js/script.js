"use strict";

//console.log("Going");
//Навешиваем событие на клик по ветке дерева
//Должны показываться только дочерние элементы к нему
let branch = document.querySelectorAll(".tree__branch");
//Пробегаемся по всем элементам
branch.forEach(function(elem){
    elem.addEventListener("click", function(event){
        event.stopImmediatePropagation();
// найти всех соседних в цикле
        let sibling = event.target;
        console.log(sibling);
        while (sibling.nextSibling) {
            sibling = sibling.nextSibling;
            console.log(sibling);
//сразу меняем класс            
            sibling.nodeType ==1 && sibling.classList.toggle("tree__branch-show");            

}
    })
});

//Кнопка Развернуть все
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
console.log(expand);
