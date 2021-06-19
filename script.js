//подсказки для игрока
const status = document.querySelector('.status');

//перемешивание стаканов
const shuffle = n => {
    status.innerText = `turn: ${n}`;
    const var1 = randomInteger(0,5);
    let var2 = var1;
    do {
        var2 = randomInteger(0,5);
    } while (var1===var2);
    const cup1 = document.querySelector(`#c${var1+1}`);
    const cup2 = document.querySelector(`#c${var2+1}`);
    cup1.removeAttribute('id');
    cup2.removeAttribute('id');
    cup1.id=`c${var2+1}`;
    cup2.id=`c${var1+1}`;   
    if(n>0) setTimeout(shuffle, 700, n-1);
    else {
        status.innerText = 'choose cup';
        //проверка выбора игрока
        document.querySelectorAll('.cup').forEach((e)=>{
            e.onclick = ()=>{
                document.querySelector('#ball').style.display = 'block';                
                if(e.firstChild) alert('You win!');                
                else alert('You lose!');
                document.querySelector('#play').disabled = false;                
                status.innerText = 'click play';
                //обнуление обработчика для избежания возможности
                //выбрать стакан во время перемешивания
                document.querySelectorAll('.cup').forEach((e)=>{
                    e.onclick = null;
                });
            }
        });
    }
};

//начало игры
document.querySelector('#play').addEventListener('click',()=>{
    document.querySelector('#ball').style.display = 'none';
    setTimeout(shuffle, 0, +document.querySelector('#shuffle_count').value);
    document.querySelector('#play').disabled = true;
});

//проверка количества перемешиваний
document.querySelector('#shuffle_count').addEventListener('focusout',function(){
    if(!this.value||this.value<7||this.value>20) this.value = 7;
})

//рандом от мин до макс
function randomInteger(min, max) {    
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

