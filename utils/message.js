const fs = require('fs');


const dirPath = './data';
const dataPath = './data/messages.json';

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

const loadMessages = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const messages = JSON.parse(fileBuffer); 
    return messages; 
};

const saveMessages = (messages) => {
    fs.writeFileSync('data/messages.json', JSON.stringify(messages));
};

const addMessages = (message) => {
    const messages = loadMessages();
    messages.push(message);
    saveMessages(messages);
}

module.exports = {loadMessages, addMessages};