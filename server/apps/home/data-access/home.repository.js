
const tests = {
    quizzes: [
        // --- ТЕСТ 1: Англійська мова (A1) ---
        {
            id: 1,
            title: "Тест з англійської мови (A1)",
            description: "Перевір свої базові знання англійських слів і граматики.",
            questions: [
                {
                    text: "Як сказати 'яблуко' англійською?",
                    options: [
                        { text: "pear", id: 0, isCorrect: false },
                        { text: "apple", id: 1, isCorrect: true },
                        { text: "orange", id: 2, isCorrect: false },
                        { text: "banana", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Оберіть правильне дієслово: 'They ___ from Ukraine.'",
                    options: [
                        { text: "is", id: 0, isCorrect: false },
                        { text: "am", id: 1, isCorrect: false },
                        { text: "are", id: 2, isCorrect: true },
                        { text: "be", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 2: Англійська мова (A2) ---
        {
            id: 2,
            title: "Тест з англійської мови (A2)",
            description: "Перевір свої знання часів та структури речень.",
            questions: [
                {
                    text: "Яке слово означає 'подорож'?",
                    options: [
                        { text: "Journey", id: 0, isCorrect: true },
                        { text: "Work", id: 1, isCorrect: false },
                        { text: "Home", id: 2, isCorrect: false },
                        { text: "Street", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Оберіть минулу форму дієслова 'go':",
                    options: [
                        { text: "goed", id: 0, isCorrect: false },
                        { text: "gone", id: 1, isCorrect: false },
                        { text: "went", id: 2, isCorrect: true },
                        { text: "going", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Як сказати 'веселий' або 'радісний'?",
                    options: [
                        { text: "sad", id: 0, isCorrect: false },
                        { text: "angry", id: 1, isCorrect: false },
                        { text: "tired", id: 2, isCorrect: false },
                        { text: "gay", id: 3, isCorrect: true },
                    ],
                },
            ],
        },
        // --- ТЕСТ 3: Англійська мова (B1) ---
        {
            id: 3,
            title: "Тест з англійської мови (B1)",
            description: "Перевір свої знання Present Perfect та умовних речень.",
            questions: [
                {
                    text: "Оберіть правильну форму: 'I ___ (live) in this city for ten years.'",
                    options: [
                        { text: "lived", id: 0, isCorrect: false },
                        { text: "have lived", id: 1, isCorrect: true },
                        { text: "am living", id: 2, isCorrect: false },
                        { text: "will live", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Доповніть речення: 'If I were rich, I ___ a mansion.'",
                    options: [
                        { text: "will buy", id: 0, isCorrect: false },
                        { text: "would buy", id: 1, isCorrect: true },
                        { text: "buy", id: 2, isCorrect: false },
                        { text: "have bought", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Що означає 'reliable'?",
                    options: [
                        { text: "швидкий", id: 0, isCorrect: false },
                        { text: "дорогий", id: 1, isCorrect: false },
                        { text: "надійний", id: 2, isCorrect: true },
                        { text: "складний", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 4: Історія України ---
        {
            id: 4,
            title: "Тест: Історія України (Базовий)",
            description: "Перевірте знання ключових подій української історії.",
            questions: [
                {
                    text: "В якому році було проголошено незалежність України?",
                    options: [
                        { text: "1989", id: 0, isCorrect: false },
                        { text: "1991", id: 1, isCorrect: true },
                        { text: "1996", id: 2, isCorrect: false },
                        { text: "2004", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Хто був автором слів гімну України?",
                    options: [
                        { text: "Тарас Шевченко", id: 0, isCorrect: false },
                        { text: "Павло Чубинський", id: 1, isCorrect: true },
                        { text: "Леся Українка", id: 2, isCorrect: false },
                        { text: "Михайло Вербицький", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Коли відбулася Помаранчева революція?",
                    options: [
                        { text: "1991", id: 0, isCorrect: false },
                        { text: "2000", id: 1, isCorrect: false },
                        { text: "2004", id: 2, isCorrect: true },
                        { text: "2014", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 5: Математика ---
        {
            id: 5,
            title: "Тест з Математики (Алгебра)",
            description: "Перевірка базових знань з алгебри.",
            questions: [
                {
                    text: "Який результат виразу: 5 * (4 + 2) - 10?",
                    options: [
                        { text: "20", id: 0, isCorrect: true },
                        { text: "30", id: 1, isCorrect: false },
                        { text: "10", id: 2, isCorrect: false },
                        { text: "15", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Чому дорівнює $\\sqrt{81}$?",
                    options: [
                        { text: "7", id: 0, isCorrect: false },
                        { text: "9", id: 1, isCorrect: true },
                        { text: "8.1", id: 2, isCorrect: false },
                        { text: "40.5", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Розв'яжіть рівняння: 2x + 5 = 15",
                    options: [
                        { text: "x = 10", id: 0, isCorrect: false },
                        { text: "x = 7.5", id: 1, isCorrect: false },
                        { text: "x = 5", id: 2, isCorrect: true },
                        { text: "x = 2.5", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 6: Географія ---
        {
            id: 6,
            title: "Тест з Географії (Світ)",
            description: "Перевір свої знання столиць та континентів.",
            questions: [
                {
                    text: "Яка столиця Канади?",
                    options: [
                        { text: "Торонто", id: 0, isCorrect: false },
                        { text: "Ванкувер", id: 1, isCorrect: false },
                        { text: "Оттава", id: 2, isCorrect: true },
                        { text: "Монреаль", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Який найменший континент?",
                    options: [
                        { text: "Європа", id: 0, isCorrect: false },
                        { text: "Австралія", id: 1, isCorrect: true },
                        { text: "Антарктида", id: 2, isCorrect: false },
                        { text: "Південна Америка", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Яка річка є найдовшою у світі?",
                    options: [
                        { text: "Ніл", id: 0, isCorrect: false },
                        { text: "Амазонка", id: 1, isCorrect: true },
                        { text: "Міссісіпі", id: 2, isCorrect: false },
                        { text: "Янцзи", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 7: Програмування (JS) ---
        {
            id: 7,
            title: "Тест з JavaScript (Основи)",
            description: "Перевірка знань базового синтаксису JavaScript.",
            questions: [
                {
                    text: "Як оголосити константу в JS?",
                    options: [
                        { text: "var x = 1;", id: 0, isCorrect: false },
                        { text: "const x = 1;", id: 1, isCorrect: true },
                        { text: "let x = 1;", id: 2, isCorrect: false },
                        { text: "constant x = 1;", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Який метод додає елемент в кінець масиву?",
                    options: [
                        { text: "shift()", id: 0, isCorrect: false },
                        { text: "pop()", id: 1, isCorrect: false },
                        { text: "push()", id: 2, isCorrect: true },
                        { text: "unshift()", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Який оператор використовується для строгої рівності (за типом і значенням)?",
                    options: [
                        { text: "==", id: 0, isCorrect: false },
                        { text: "=", id: 1, isCorrect: false },
                        { text: "!=", id: 2, isCorrect: false },
                        { text: "===", id: 3, isCorrect: true },
                    ],
                },
            ],
        },
        // --- ТЕСТ 8: Біологія ---
        {
            id: 8,
            title: "Тест з Біології (Клітина)",
            description: "Основні знання про будову клітини.",
            questions: [
                {
                    text: "Який органел відповідає за фотосинтез?",
                    options: [
                        { text: "Мітохондрії", id: 0, isCorrect: false },
                        { text: "Рибосоми", id: 1, isCorrect: false },
                        { text: "Хлоропласти", id: 2, isCorrect: true },
                        { text: "Ядро", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Що називають 'енергетичною станцією' клітини?",
                    options: [
                        { text: "Мітохондрії", id: 0, isCorrect: true },
                        { text: "Лізосоми", id: 1, isCorrect: false },
                        { text: "Вакуолі", id: 2, isCorrect: false },
                        { text: "Хлоропласти", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 9: Література ---
        {
            id: 9,
            title: "Тест з Української Літератури",
            description: "Твори та автори класичної української літератури.",
            questions: [
                {
                    text: "Хто є автором поеми 'Катерина'?",
                    options: [
                        { text: "Іван Франко", id: 0, isCorrect: false },
                        { text: "Тарас Шевченко", id: 1, isCorrect: true },
                        { text: "Леся Українка", id: 2, isCorrect: false },
                        { text: "Панас Мирний", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Хто написав 'Лісову пісню'?",
                    options: [
                        { text: "Ольга Кобилянська", id: 0, isCorrect: false },
                        { text: "Іван Нечуй-Левицький", id: 1, isCorrect: false },
                        { text: "Леся Українка", id: 2, isCorrect: true },
                        { text: "Тарас Шевченко", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
        // --- ТЕСТ 10: Фізика (Механіка) ---
        {
            id: 10,
            title: "Тест з Фізики (Механіка)",
            description: "Базові закони Ньютона та кінематика.",
            questions: [
                {
                    text: "Яка одиниця вимірювання сили в системі СІ?",
                    options: [
                        { text: "Ватт (W)", id: 0, isCorrect: false },
                        { text: "Джоуль (J)", id: 1, isCorrect: false },
                        { text: "Ньютон (N)", id: 2, isCorrect: true },
                        { text: "Паскаль (Pa)", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Формула другого закону Ньютона:",
                    options: [
                        { text: "F = m * a", id: 0, isCorrect: true },
                        { text: "E = mc^2", id: 1, isCorrect: false },
                        { text: "P = F / A", id: 2, isCorrect: false },
                        { text: "A = F * s", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
    ],
    // --- Секція результатів ---
    results: [
        {
            timestamp: "2026-06-06T03:06:06Z",
            title: "Тест з англійської мови (A1)",
            summary: 2,
            answers: [[1], [2]],
            questions: [
                {
                    text: "Як сказати 'яблуко' англійською?",
                    options: [
                        { text: "pear", id: 0, isCorrect: false },
                        { text: "apple", id: 1, isCorrect: true },
                        { text: "orange", id: 2, isCorrect: false },
                        { text: "banana", id: 3, isCorrect: false },
                    ],
                },
                {
                    text: "Оберіть правильне дієслово: 'They ___ from Ukraine.'",
                    options: [
                        { text: "is", id: 0, isCorrect: false },
                        { text: "am", id: 1, isCorrect: false },
                        { text: "are", id: 2, isCorrect: true },
                        { text: "be", id: 3, isCorrect: false },
                    ],
                },
            ],
        },
    ],
};

export class dataAccessModule {
    static findAll() {
        const values = tests;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(values);
            }, 1000);
        })
    }
}