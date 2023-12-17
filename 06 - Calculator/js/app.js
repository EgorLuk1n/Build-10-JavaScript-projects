const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button')

const specialChars = ["%", "*", "/", "-", "+", '=']

let output = ""

const colculate = (btnValue) => {
    display.focus()
    if (btnValue === '=' && output !== '') {
        output = eval(output.replace('%', '/100'))
    } else if (btnValue === 'C') {
        output = ""
    } else if (btnValue === "CE") {
        output = output.toString().slice(0, -1)
    } else {
        if (output === "" && specialChars.includes(btnValue)) return
        output += btnValue
    }
    display.value = output
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => colculate (e.target.dataset.value))
})