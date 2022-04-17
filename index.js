const generateBtn = document.getElementById("generateBtn")
const passwordLength = document.getElementById("passwordLength")
const errorMessage = document.getElementById("errorMessage")
const passwordResult = document.querySelectorAll(".password-result")
const copyBtn = document.querySelectorAll(".btn-copy")

// create four arrays with allowed characters: lowercase letters, uppercase letters, numbers, and symbols
const lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"]

// if password length is empty throw an error
passwordLength.addEventListener('click', function() {
    if (passwordLength.value !==  "") {
        errorMessage.classList.add("error-message-display")
    }
})

// get random characters from the arrays; try -> Math.floor(Math.random() * array.length)
function getRandomLowercase() {
    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]
}

function getRandomUppercase() {
    return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]
}

function getRandomNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)]
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
}

// get random password concatenating the previous values
function getRandomPassword() {
    let temp = ""
    
    for (let i = 0; i < 6; i++) {

        temp += getRandomLowercase() + getRandomUppercase() + getRandomNumber() + getRandomSymbol()
    }

    return temp
}

generateBtn.addEventListener('click', function() {
    errorMessage.classList.add("error-message-display")

    copyBtn.forEach(el => {
        el.innerHTML = "Copy"
        el.style.backgroundColor = "#8B5CF6"
    })


    if (passwordLength.value ===  "") {
        errorMessage.classList.remove("error-message-display")
    } else {
        for(let j = 0; j < passwordResult.length; j++) {
            passwordResult[j].value = getRandomPassword().slice(0, passwordLength.value)
        }
    }

})

// copy selected password from clipboard
copyBtn.forEach((el, i) => {
    el.addEventListener('click', function(e) {
        console.log(el, i)
        console.log(passwordResult[i].value)
        e.preventDefault()
        if( passwordResult[i].value === "") {
            ;
        } else {
            passwordResult[i].select()
            navigator.clipboard.writeText(passwordResult[i].value)

            const originalContent = el.innerHTML
            const originalBgColor = el.style.backgroundColor
            el.innerHTML = "Copied"
            el.style.backgroundColor = "#10B981"
            setTimeout(() => {
                el.innerHTML = originalContent
                el.style.backgroundColor = originalBgColor
            }, 1100);
        }
    })
});