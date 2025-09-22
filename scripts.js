// Получаем все кнопки и поле для отображения
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

// Переменные для хранения текущего выражения и результата
let expression = '';
let result = 0;

// Основная функция для обработки нажатий на кнопки
function onButtonClick(event) {
    const value = event.target.textContent; // Значение кнопки

    // Очистка экрана
    if (value === 'AC') {
        expression = '';
        display.textContent = '0';
        return; // Прерываем выполнение функции
    }

    // Вычисление выражения (=)
    if (value === '=') {
        // Заменяем математические символы на JS-операторы
        const prepared = expression
            .replaceAll("×", "*")
            .replaceAll("÷", "/")
            .replaceAll("−", "-");

        result = eval(prepared); // Вычисляем выражение
        display.textContent = result;
        expression = result; // Сохраняем результат для дальнейших операций
        return;
    }

    // Процент (%)
    if (value === '%') {
        result = eval(expression) / 100;
        display.textContent = result;
        expression = result;
        return;
    }

    // Смена знака (+/-)
    if (value === '+/-') {
        result = eval(expression);
        expression = -result;
        display.textContent = expression;
        return;
    }

    // Если на дисплее "0", то заменяем его на новое значение
    if (display.textContent === '0') {
        display.textContent = value;
        expression = value;
    } else {
        // Иначе просто добавляем символ
        display.textContent += value;
        expression += value;
    }
}

// Вешаем обработчик на каждую кнопку
buttons.forEach(btn => {
    btn.addEventListener('click', onButtonClick);
});