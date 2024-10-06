const words = [
  "Utility AI", "Addressables", "UnitTesting", "Teamlead", "Architecture", "ECS", "All courses",
  "Utility AI", "Addressables", "UnitTesting", "Teamlead", "Architecture", "ECS", "All courses",
  "Utility AI", "Addressables", "UnitTesting", "Teamlead", "Architecture", "ECS", "All courses"
];
const probabilities = [
  40, 40, 30, 30, 15, 10, 5, 
  40, 40, 30, 30, 15, 10, 5,
  40, 40, 30, 30, 15, 10, 5
]; // Проценты шансов для каждого слова

const roulette = document.getElementById('roulette');
const startBtn = document.getElementById('startBtn');
const resultDisplay = document.getElementById('result'); // Получаем элемент для отображения результата
// Максимальное количество нажатий
const maxClicks = 4;

// Получаем количество нажатий из localStorage или устанавливаем в 0
let clickCount = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;

// Получаем сохраненное состояние кнопки и текст результата
let isButtonDisabled = localStorage.getItem('isButtonDisabled') === 'true';
let savedResultText = localStorage.getItem('resultText');

// Функция для проверки и отключения кнопки
// function checkClicks() {
//     if (clickCount >= maxClicks || isButtonDisabled) {
//         startBtn.classList.add('notActive');
//         startBtn.disabled = true; // Делаем кнопку неактивной
//         resultDisplay.textContent = savedResultText || 'Вы использовали все свои попытки :(';
//     }
// }

// Инициализируем проверку при загрузке страницы
// checkClicks();

let currentIndex = 0;
let currentOffset = 0;
let spinSpeed = 50; // Начальная скорость
let decelerationRate = 1.1; // Коэффициент замедления
let spinInterval;
let randomTargetIndex; // Индекс для случайного остановочного слова

function startRoulette() {

     // Увеличиваем количество нажатий и сохраняем в localStorage
    clickCount++;
    localStorage.setItem('clickCount', clickCount);

    // Проверяем, не превысило ли количество нажатий лимит
    // if (clickCount >= maxClicks) {
    //     isButtonDisabled = true;
    //     localStorage.setItem('isButtonDisabled', true); // Сохраняем состояние кнопки
    //     checkClicks();
    //     return;
    // }

    // Очищаем предыдущие слова
    roulette.innerHTML = '';

    startBtn.classList.add('notActive');
    resultDisplay.textContent = 'Spinning...'; // Обновляем текст при старте

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = word;
        roulette.appendChild(wordDiv);
    });

    currentIndex = 0;
    currentOffset = 0;
    spinSpeed = 50;   // Высокая начальная скорость
    randomTargetIndex = getWeightedRandomIndex(probabilities); // Генерация случайного индекса с учетом вероятностей
    spinRoulette();
}

function spinRoulette() {
    let remainingSpins = (words.length * 1) + randomTargetIndex; // Фиксированные обороты + рандомная остановка

    if (spinInterval) clearInterval(spinInterval);

    spinInterval = setInterval(() => {
        remainingSpins--;
        currentIndex = (currentIndex + 1) % words.length; // Переход на следующее слово
        currentOffset = currentIndex * 200; // Сдвиг в пикселях

        // Обновляем позицию рулетки
        roulette.style.transition = `transform ${spinSpeed / 1000}s ease-out`; // плавное движение
        roulette.style.transform = `translateX(-${currentOffset}px)`;

        // Замедляем прокрутку
        if (remainingSpins < words.length) {
            spinSpeed *= decelerationRate; // Увеличиваем время между шагами
        }

        // Останавливаемся на случайном слове
        if (remainingSpins <= 0) {
            stopRoulette();
        }
    }, spinSpeed);
}

// Функция для генерации случайного индекса на основе вероятностей
function getWeightedRandomIndex(weights) {
    const total = weights.reduce((sum, weight) => sum + weight, 0); // Общая сумма всех весов
    const random = Math.random() * total; // Случайное число в диапазоне от 0 до общей суммы
    let cumulative = 0;

    for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) {
            return i;
        }
    }
    return 0; // На всякий случай, если что-то пошло не так
}

function stopRoulette() {
    clearInterval(spinInterval);
    let finalWord = words[currentIndex];
    console.log("Final word:", finalWord);

    // Останавливаем рулетку
    roulette.style.transition = '';
    startBtn.classList.remove('notActive');


    // Рассчитываем, как сместить слово в центр
    const containerWidth = document.getElementById('roulette-container').offsetWidth; // Ширина контейнера рулетки
    const wordWidth = 400; // Ширина каждого слова
    const centerOffset = (containerWidth / 2) - (wordWidth / 2); // Вычисляем смещение для центрирования слова

    // Смещаем рулетку так, чтобы выбранное слово оказалось в центре
    const totalOffset = currentIndex * wordWidth - centerOffset;
    roulette.style.transform = `translateX(-${totalOffset}px)`; // Сдвигаем рулетку

    // Выводим результат на экран
    
    // console.log(finalWord);
    // if (finalWord === "Apple"){
    //     resultDisplay.textContent = `Result: ${finalWord} 30%`;
    // } else {
    //     resultDisplay.textContent = `Result: ${finalWord}`;
    // }

    switch (finalWord) {
  case "Utility AI":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 40%`;
    break;
  case "Addressables":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 40%`;
    break;
  case "UnitTesting":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 30%`;
    break;
  case "Teamlead":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 30%`;
    break;
  case "Architecture":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 15%`;
    break;
  case "ECS":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 10%`;
    break;
  case "All courses":
    resultDisplay.textContent = `Your PROMO: ${finalWord} 5%`;
    break;
  default:
    resultDisplay.textContent = `Something went wrong...`;
    }
}

startBtn.addEventListener('click', startRoulette);
