const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Welcome messages
const welcomeMessages = [
    "Hello! I'm your friendly chatbot. How can I help you today?",
    "Welcome! Ask me anything and I'll do my best to assist you.",
    "Hi there! Ready to chat. What's on your mind?"
];

// Frequently asked questions and corresponding answers
const faq = {
    "What is your name?": "I'm a chatbot.",
    "How are you?": "I'm just a computer program, so I don't have feelings, but thanks for asking!",
    "What can you do?": "I can provide information, answer questions, or just chat with you. Feel free to ask anything!",
    // Add more FAQ pairs as needed
};

// Greeting messages
const greetingMessages = [
    "Hi!",
    "Hello!",
    "Hey there!",
    "Greetings!",
    "Good to see you!",
];

// const cmrinfo = [
//     "where is hod cabin?": "I'm a chatbot.",
//     "How are you?": "I'm just a computer program, so I don't have feelings, but thanks for asking!",
//     "What can you do?": "I can provide information, answer questions, or just chat with you. Feel free to ask anything!",
// ];

// Additional responses for BTech 1st-year student-related questions
const studentResponses = [
    "How's your first year going so far?",
    "Need help with any specific subjects in your BTech 1st year?",
    "Exciting times in your first year! What subjects are you studying?",
    "How are you finding the transition to college life?",
    "Have you joined any clubs or student organizations yet?",
    "Thinking about your major? I can help you explore your options!",
    "How are you leveraging technology for collaborative learning with your peers?",
    "Thoughts on building a professional online presence for future opportunities?",
    "Strategies for effective communication with faculty and peers?",
    "Reflecting on the importance of teamwork in engineering projects?",
];

//developer questions
const developer = [
    "my developers are 6 btech students pursuing their btech in CMR Engineering College",
    "i've been developed as a project",
];

//goodtohear
const goodToHear = [
    "good to hear",
    "sounds good",
];

//haa
const haa = [
    "ok",
    "okay",
];

aaaa =["i'm developed by 6 engineers 1.kunta vignesh 2.jadala shivamani 3.cotti manju 4.kunja srija 5.shaik nazeer 6.nanda kumar",];

// Wishes
const wishes = [
    "Have a great day!",
    "Wishing you all the best!",
    "May your day be filled with joy!",
    "Take care!",
    "Hope you have an amazing day!",
];

console.log("helo world");
function makeWikipediaRequest(searchTerm) {
    const wikipediaBaseUrl = 'https://en.wikipedia.org/wiki/';
    const sanitizedSearchTerm = encodeURIComponent(searchTerm);
    const wikipediaUrl = wikipediaBaseUrl + sanitizedSearchTerm;

    // Append the Wikipedia link to the chat
    appendMessage(`<a href="${wikipediaUrl}" target="_blank">${searchTerm}</a>`, 'bot-message');
}

async function makeWikipediaApiRequest(searchTerm) {
    const sanitizedSearchTerm = encodeURIComponent(searchTerm);
    const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${sanitizedSearchTerm}&prop=extracts&exintro=1&origin=*`;

    try {
        const response = await fetch(wikipediaUrl);
        const data = await response.json();

        // Get the first page ID in the response
        const pageId = Object.keys(data.query.pages)[0];

        // Check if the page ID is valid and has extract data
        if (pageId && data.query.pages[pageId].extract) {
            appendMessage(data.query.pages[pageId].extract, 'bot-message');
        } else {
            appendMessage('No information found on Wikipedia.', 'bot-message');
        }
    } catch (error) {
        console.error('Error fetching data from Wikipedia API:', error);
        appendMessage('Sorry, I couldn\'t retrieve information from Wikipedia.', 'bot-message');
    }
}

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    
    if (userMessage !== '') {
        appendMessage(userMessage, 'user-message');

        // Check if the user's message matches a frequently asked question
        const faqAnswer = faq[userMessage];
        if (faqAnswer) {
            setTimeout(() => appendMessage(faqAnswer, 'bot-message'), 500);
            userInput.value = '';
            return;
        }

        // Check for specific keywords to generate responses
        if (containsKeywords(userMessage, ['hello', 'hi', 'hey'])) {
            setTimeout(() => appendRandomMessage(greetingMessages, 'bot-message'), 500);
        }/* else if (containsKeywords(userMessage, ['how', 'are', 'you'])) {
            setTimeout(() => appendMessage("I'm just a computer program, so I don't have feelings, but thanks for asking!", 'bot-message'), 500);
        } */else if (containsKeywords(userMessage, ['bye', 'goodbye'])) {
            setTimeout(() => appendRandomMessage(wishes, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['btech', 'first year','college','student'])) {
            setTimeout(() => appendRandomMessage(studentResponses, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['okay','oho','ok'])) {
            setTimeout(() => appendRandomMessage(haa, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['nice', 'good','wow','eww'])) {
            setTimeout(() => appendRandomMessage(goodToHear, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['who', 'are','they','their names'])) {
            setTimeout(() => appendRandomMessage(aaaa, 'bot-message'), 500);
        }
         else if (containsKeywords(userMessage, ['who', 'made','developed','you','yourself'])) {
            setTimeout(() => appendRandomMessage(developer, 'bot-message'), 500);
        }  else if (containsKeywords(userMessage, ['math', 'calculate', 'solve'])) {
            // Handle basic math questions
            const mathExpression = userMessage.replace(/[^-()\d/*+.]/g, ''); // Remove non-math characters
            try {
                const result = eval(mathExpression);
                setTimeout(() => appendMessage(`The result is: ${result}`, 'bot-message'), 500);
            } catch (error) {
                setTimeout(() => appendMessage('Sorry, I couldn\'t calculate that.', 'bot-message'), 500);
            }
        } else if(containsKeywords(userMessage, ['wiki', 'wikipedia'])) {
            const searchTerm = userMessage.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove non-alphanumeric characters
          //  makeWikipediaApiRequest(searchTerm);
          makeWikipediaRequest(searchTerm);
        }
         else {
            // Default response for unrecognized input
            setTimeout(() => appendMessage("I'm not sure how to respond to that. Feel free to ask something else!", 'bot-message'), 500);
        }

        userInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message; 
    chatBox.appendChild(messageElement);
}

function appendRandomMessage(messages, className) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    appendMessage(messages[randomIndex], className);
}

function containsKeywords(message, keywords) {
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
}

// Initial welcome message
setTimeout(() => appendRandomMessage(welcomeMessages, 'bot-message'), 500);
