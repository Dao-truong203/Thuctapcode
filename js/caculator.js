document.addEventListener('DOMContentLoaded', function() {
    var input = document.querySelector('.screen');
    var items = Array.from(document.querySelectorAll('.item'));
    var historyList = document.querySelector('.history-list');
    var totalElement = document.createElement('div');
    totalElement.classList.add('total');
    historyList.parentNode.insertBefore(totalElement, historyList.nextSibling);

    var history = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(function(calculation) {
            var li = document.createElement('li');
            var date = new Date().toLocaleString();
            li.textContent = date + ' - ' + calculation;
            historyList.appendChild(li);
        });
        var total = calculateTotal();
        totalElement.textContent = 'Total: ' + total;
    }

    function calculateTotal() {
        var total = 0;
        history.forEach(function(calculation) {
            var parts = calculation.split('=');
            if (parts.length === 2) {
                total += parseFloat(parts[1].trim());
            }
        });
        return total;
    }

    items.forEach(function(btn) {
        btn.addEventListener('click', function() {
            switch (btn.innerHTML) {
                case '0':
                    if (input.innerHTML === '0') {
                        input.innerHTML = '';
                    }
                    input.innerHTML += '0';
                    break;
                case 'AC':
                    input.innerHTML = '0';
                    break;
                case 'DEL':
                    var arrtext = Array.from(input.innerHTML);
                    arrtext.splice(arrtext.length - 1, 1);
                    input.innerHTML = arrtext.length !== 0 ? arrtext.join('') : '0';
                    break;
                case '=':
                    var result = eval(input.innerHTML);
                    history.push(input.innerHTML + " = " + result);
                    localStorage.setItem('calculationHistory', JSON.stringify(history));
                    renderHistory();
                    break;
                default:
                    input.innerHTML += btn.innerHTML;
            }
        });
    });

    var total = calculateTotal();
    console.log(total);

    renderHistory();
});
