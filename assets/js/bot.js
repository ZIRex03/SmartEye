// конфигурация чат-бота
const configChatbot = {};
// CSS-селектор кнопки, посредством которой будем вызывать окно диалога с чат-ботом
configChatbot.btn = '.chatbot__btn';
// ключ для хранения отпечатка браузера
configChatbot.key = 'fingerprint';
// реплики чат-бота
configChatbot.replicas = {
    bot: {
        0: {
            content: 'Привет! Я Орлиный Глаз - бот поддержки сайта <a href="https://smart-eye.vercel.app/index.html" target="_blank">smart-eye.vercel.app</a>', human: [0]
        },
        1: { content: 'Я тоже рад, как мне к Вам обращаться', human: [3] },
        2: { content: 'Как мне к Вам обращаться?', human: [3] },
        3: { content: '{{name}}, что вас интересует?', human: [4] },
        4: { content: 'Это веб-приложение, которое с помошью специального алгоритма определяет различные объекты на фотографии. Хотите узнать побольше?', human: [5] },
        5: { content: 'Наш алгоритм использует метод дефрагментации (деление на части). Если хотите получше ознакомиться с этим, то можете перейти на эту страницу <a href="https://smart-eye.vercel.app/project.html" target="_blank">О проекте</a> или скачать презентацию, сделанную нами, по этой ссылке <a href="./assets/images/Интеллект для принятия решений.pptx" target="_blank">Скачать презентацию</a>, либо по кнопке "Презентация" на сайте.', human: [6] },
        6: { content: 'Будем рады тебя видеть снова, {{name}}!', human: [7] },
        /* ... */
    },
    human: {
        0: { content: 'Привет! Я рад с тобой познакомиться', bot: 1 },
        1: { content: 'Салют!', bot: 2 },
        2: { content: 'Приветик, Орлиный Глаз!', bot: 2 },
        3: { content: '', bot: 3, name: 'name' },
        4: { content: 'Что это за проект?', bot: 4 },
        5: { content: 'Конечно!', bot: 5 },
        6: { content: 'Спасибо, было очень интересно. Пока!', bot: 6 },
        7: {conten: 'В начало', bot: 0},
        /* ... */
    },
}
// корневой элемент
configChatbot.root = SimpleChatbot.createTemplate();
// URL chatbot.php
configChatbot.url = '/chatbot/chatbot.php';
// создание SimpleChatbot
let chatbot = new SimpleChatbot(configChatbot);
// при клике по кнопке configChatbot.btn
document.querySelector(configChatbot.btn).onclick = function (e) {
    this.classList.add('d-none');
    const $tooltip = this.querySelector('.chatbot__tooltip');
    if ($tooltip) {
        $tooltip.classList.add('d-none');
    }
    configChatbot.root.classList.toggle('chatbot_hidden');
    chatbot.init();
};
// добавление ключа для хранения отпечатка браузера в LocalStorage
let fingerprint = localStorage.getItem(configChatbot.key);
if (!fingerprint) {
    Fingerprint2.get(function (components) {
        fingerprint = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
        }).join(), 31)
        localStorage.setItem(configChatbot.key, fingerprint)
    });
}