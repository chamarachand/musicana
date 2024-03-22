let buttons = document.querySelector('.buttons');
let button = buttons.querySelectorAll('.button');
for(var i = 0; i<button.length; i++){
    button[i].addEventListener('click', function(){
        let current = document.getElementsByClassName('active2');
        current[0].className = current[0].className.replace("active2", "",this.className += " active2");
    })
}

function changeColor(){
    document.body.style.backgroundColor = 'rgb(' + Math.round(Math.random()*255) +
    ',' + Math.round(Math.random()*255) +
    ',' + Math.round(Math.random()*255) + ')';
}

function colorBox(id){
    document.body.style.backgroundColor = document.getElementById(id).innerHTML;
}


