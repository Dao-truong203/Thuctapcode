var input = document.querySelector('.screen');
var items = Array.from(document.querySelectorAll('.item'));

items.forEach(function (btn) {
    btn.addEventListener('click', function () {
        switch (true) {
            case input.innerHTML === '0':
                input.innerHTML = '';
                break;
            case btn.innerHTML === 'AC':
                input.innerHTML = '0';
                break;
            case btn.innerHTML === 'DEL':
                var arrtext = Array.from(input.innerHTML);
                arrtext.splice(arrtext.length - 1, 1);
                input.innerHTML = arrtext.length !== 0 ? arrtext.join('') : '0';
                break;
            case btn.innerHTML === '=':
                input.innerHTML = eval(input.innerHTML);
                break;
            default:
                input.innerHTML += btn.innerHTML;
        }
    });
});