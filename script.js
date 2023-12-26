const form = document.querySelector("#form");
const numberOfCharactersInput = document.querySelector("#count");
const uppercaseInput = document.querySelector("#uppercase");
const numbersInput = document.querySelector("#numbers");
const displayEl = document.querySelector("#display");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const numberOfCharacters = numberOfCharactersInput.value;
    const includeUppercase = uppercaseInput.checked;
    const includeNumbers = numbersInput.checked;

    const resource = 'abcdefghijklmnopqrstuvwxyz';
    const generetedPassword = generator(numberOfCharacters, resource, includeUppercase, includeNumbers);
    showPassword(generetedPassword);
});


function generator(length = 8, resource, includeUppercase, includeNumbers) {
    let password = '';
    
    // Create shuffled strings for uppercase letters and numbers
    const shuffledUppercase = shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const shuffledNumbers = shuffle('0123456789');
    
    for (let i = 0; i < length; i++) {
        if (includeUppercase && i % 2 === 0) {
            password += shuffledUppercase.charAt(i / 2 % shuffledUppercase.length);
        }
        
        if (includeNumbers && i % 2 === 1) {
            password += shuffledNumbers.charAt(Math.floor(i / 2) % shuffledNumbers.length);
        }
        
        // Add a random lowercase character
        password += getRandomCharacter(resource);
    }
    
    return password.slice(0, length); // Trim to the desired length
}

function getRandomCharacter(characters) {
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function showPassword(password) {
    displayEl.textContent = password;
}
function shuffle(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}
