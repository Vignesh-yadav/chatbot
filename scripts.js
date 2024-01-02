const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const welcomeMessages = [
    "Hello! I'm your friendly chatbot. How can I help you today?",
    "Welcome! Ask me anything and I'll do my best to assist you.",
    "Hi there! Ready to chat. What's on your mind?"
];


const faq = {
    "What is your name?": "I'm a chatbot.",
    "How are you?": "I'm just a computer program, so I don't have feelings, but thanks for asking!",
    "What can you do?": "I can provide information, answer questions, or just chat with you. Feel free to ask anything!"
};

const favourite = [
    "as i am a chat-bot i don't have any favourites.....",
    "i don't have feelings so i don't have any favourites,likes or dislikes",
];

const greetingMessages = [
    "Hi!",
    "Hello!",
    "Hey there!",
    "Greetings!",
    "Good to see you!",
];

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


const developer = [
    "my developers are 6 btech students pursuing their btech in CMR Engineering College",
    "i've been developed as a project",
];

const cmr = [
    "CMR engineering college is one of the top premier private Engineering colleges in Hyderabad spreads over the vast area of 10 acres. The CMR College is authorized under All India Council for Technical Education (AICTE), New Delhi and affiliated to JNTUH.With the commencement of CMR Hyderabad, Our College hit the list of 100 top engineering colleges in India.  In the further journey, the college is also rated 5 Star under Institution Innovation Council, Ministry of Education, Govt of India & Achieved ARIIA Ranking. With these achievements, today, CMR Engineering College is known as one of the Top 10 Engineering Colleges in Hyderabad."
];

const goodToHear = [
    "good to hear",
    "sounds good",
];

const cmrprincipal = [
    "Dr. A. S. Reddy"
];

lol =[
    "glad i made you laugh",
    "haha good to see you smile",
    "thats funny"
];

const haa = [
    "ok",
    "okay",
];
const aooffice = [
    "in cmrec ao office is on the left side of the entrance in the block-I"
];

const exambranch = [
    "in cmrec examination branch is on the right side of the entrance in the block-I"
];

const capabilities = ["you can ask me about CMR ENGINEERING College","i can solve basic maths use solve keyword.","i can give you wikipedia articles use keyword wiki"];

aaaa =["i'm developed by 6 engineers 1.kunta vignesh 2.jadala shivamani 3.cotti manju 4.kunja srija 5.shaik nazeer 6.nanda kumar",];

const wishes = [
    "Have a great day!",
    "Wishing you all the best!",
    "May your day be filled with joy!",
    "Take care!",
    "Hope you have an amazing day!",
];

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = userInput.value.trim();
    
    if (userMessage !== '') {
        appendMessage(userMessage, 'user-message');
        const faqAnswer = faq[userMessage];
        if (faqAnswer) {
            setTimeout(() => appendMessage(faqAnswer, 'bot-message'), 500);
            userInput.value = '';
            return;
        }

  
        if (containsKeywords(userMessage, ['hello', 'hi', 'hey'])) {
            setTimeout(() => appendRandomMessage(greetingMessages, 'bot-message'), 500);
        }else if (containsKeywords(userMessage, ['bye', 'goodbye'])) {
            setTimeout(() => appendRandomMessage(wishes, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['btech', 'first year','college','student'])) {
            setTimeout(() => appendRandomMessage(studentResponses, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['okay','oho','ok'])) {
            setTimeout(() => appendRandomMessage(haa, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['nice', 'good','wow','eww'])) {
            setTimeout(() => appendRandomMessage(goodToHear, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['who', 'are','they','their names'])) {
            setTimeout(() => appendRandomMessage(aaaa, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['lol', 'haha','woah','lolll'])) {
            setTimeout(() => appendRandomMessage(lol, 'bot-message'), 500);
        }
         else if (containsKeywords(userMessage, ['who', 'made','developed','yourself'])) {
            setTimeout(() => appendRandomMessage(developer, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['what', 'can','i ask','you'])) {
                setTimeout(() => appendRandomMessage(capabilities, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['principal of cmrec','cmrec principal'])) {
            setTimeout(() => appendRandomMessage(cmrprincipal, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['ao office'])) {
            setTimeout(() => appendRandomMessage(aooffice, 'bot-message'), 500);
        }else if (containsKeywords(userMessage, ['examination branch'])) {
            setTimeout(() => appendRandomMessage(exambranch, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['about cmr'])) {
            setTimeout(() => appendRandomMessage(cmr, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['what', 'can','i ask','you'])) {
            setTimeout(() => appendRandomMessage(capabilities, 'bot-message'), 500);
        } else if (containsKeywords(userMessage, ['favourite', 'fav','favourites','like'])) {
            setTimeout(() => appendRandomMessage(favourite, 'bot-message'), 500);
        } 
         else if (containsKeywords(userMessage, ['math', 'calculate', 'solve']))  {
          
            const mathExpression = userMessage.replace(/[^-()\d/*+.]/g, ''); 
            try {
                const result = eval(mathExpression);
                setTimeout(() => appendMessage(`The result is: ${result}`, 'bot-message'), 500);
            } catch (error) {
                setTimeout(() => appendMessage('Sorry, I couldn\'t calculate that.', 'bot-message'), 500);
            }
        } else if(containsKeywords(userMessage, ['wiki', 'wikipedia'])) {
            const searchTerm = userMessage.replace(/[^a-zA-Z0-9 ]/g, '').replace('wiki', '').trim();
            if (searchTerm !== '')  {
                const result = await fetchWikipediaData(searchTerm);
                if (result) {
                    appendMessage(`Wikipedia: ${result.title}\n${result.extract}`, 'bot-message');
                } else {
                    appendMessage("Article not found on Wikipedia", 'bot-message');
                }
                userInput.value = '';
                return;
            }

       
    }
         else {
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

setTimeout(() => appendRandomMessage(welcomeMessages, 'bot-message'), 500);
