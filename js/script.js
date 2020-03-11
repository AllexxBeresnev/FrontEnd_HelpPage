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

//        console.log(event.target);
//        event.stopPropagation;
        //найти все дочерние ul и поменять им класс
//        console.log(event.target.children.length);
//        for (let i = 0; i < elem.children.length; i++){
//            elem.children[i].classList.toggle("tree__branch-show");            
            //если это UL то ставим класс, span пропускаем (или нет))
//        }
//        let my_elem = elem.firstChild.nextSibling;
 //       console.log(elem);
//        console.log(my_elem);     
//        my_elem.classList.add("tree__branch-show");
//        console.log(my_elem.children.length);        
        //открываем дочерние элементы
//        for (let i = 0; i < my_elem.children.length; i++){
            //меняем класс чтобы был виден или скрыт
//            my_elem.children[i].classList.add("tree__branch-show");
//            console.log(my_elem.children[i]);
//        }

    })
});
