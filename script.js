const words = ["Utility AI", "Addressables", "UnitTesting", "Teamlead", "Architecture", "ECS", "All courses", "Utility AI", "Addressables", "UnitTesting", "Teamlead", "Architecture", "ECS"];
const probabilities = [40, 40, 30, 30, 15, 10, 5, 40, 40, 30, 30, 15, 10, 5]; // Проценты шансов для каждого слова
const roulette = document.getElementById('roulette');
const startBtn = document.getElementById('startBtn');
const resultDisplay = document.getElementById('result'); // Получаем элемент для отображения результата

let currentIndex = 0;
let currentOffset = 0;
let spinSpeed = 50; // Начальная скорость
let decelerationRate = 1.1; // Коэффициент замедления
let spinInterval;
let randomTargetIndex; // Индекс для случайного остановочного слова

function startRoulette() {
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

    // Выводим результат на экран
    
    // console.log(finalWord);
    // if (finalWord === "Apple"){
    //     resultDisplay.textContent = `Result: ${finalWord} 30%`;
    // } else {
    //     resultDisplay.textContent = `Result: ${finalWord}`;
    // }

    switch (finalWord) {
  case "Utility AI":
    resultDisplay.textContent = `Result: ${finalWord} 40%`;
    break;
  case "Addressables":
    resultDisplay.textContent = `Result: ${finalWord} 40%`;
    break;
  case "UnitTesting":
    resultDisplay.textContent = `Result: ${finalWord} 30%`;
    break;
  case "Teamlead":
    resultDisplay.textContent = `Result: ${finalWord} 30%`;
    break;
  case "Architecture":
    resultDisplay.textContent = `Result: ${finalWord} 15%`;
    break;
  case "ECS":
    resultDisplay.textContent = `Result: ${finalWord} 10%`;
    break;
  case "All courses":
    resultDisplay.textContent = `Result: ${finalWord} 5%`;
    break;
  default:
    resultDisplay.textContent = `Something went wrong...`;
    }
}

startBtn.addEventListener('click', startRoulette);
