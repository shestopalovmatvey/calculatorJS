let arrOfBtn = document.querySelectorAll('.calc__button');
let output = document.querySelector('.inputNum')
let currentStr = '';
let currentSum = '';
let prevSum = '';
let currentOper = '';
let s = "";

let oper = {
    isPlus: false,
    isMinus: false,
    isMul: false,
    isDiv: false,
}

let roundingNum = (num) => {
    let arr = num;
    let count = 0;
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] === '0' || arr[i] === '.') {
            count++;
        } else {
            break;
        }
    }
    return arr.slice(0, arr.length - count)
}

let setNewValue = () => {
    prevSum = currentSum;
    currentStr = '';
    currentSum = '';
    output.textContent = '0';
}

let resetOper = () => {
    for (let key in oper) {
        oper[key] = false;
    }
}

let resetValue = () => {
    output.innerText = '0';
    currentStr = '';
    currentSum = '';                
    prevSum = '';
    resetOper();
}

let kindOfOperation = (oper, currentSum, prevSum) => {
    switch (oper) {
        case 'isPlus':
            return +currentSum + +prevSum;
        case 'isMinus':
            return +prevSum - +currentSum;
        case 'isMul':
            return +currentSum * +prevSum;
        case 'isDiv':
            return roundingNum((+prevSum / +currentSum).toFixed(4))
    }
}

let elementIsSign = (element) => {
    let arr = ['+', '−', '=', '×', '÷', '←', 'C']
    return arr.includes(element)
}

for (let i = 0; i < arrOfBtn.length; i++) {
    arrOfBtn[i].addEventListener('click', (evt) => {
        let isSign = elementIsSign(evt.target.innerText)
        if (evt.target.innerText === 'C') {
            resetValue();                  
        }
        if (!isSign) {
            currentStr += evt.target.innerText;
            currentSum = currentStr;
            output.innerText = currentStr;
        }
        if (currentSum != 0 && isSign) {
            switch (evt.target.innerText) {
                case 'C':
                    resetValue();
                    break;
                case '←':
                    if (currentStr.length - 1 === 0) {
                        resetValue();
                    } else {
                        s = currentStr.slice(0, currentStr.length - 1);
                        console.log(s)
                        currentStr = s;
                        currentSum = currentStr;
                        output.innerText = currentStr;
                    }
                    break
                case '+':
                    setNewValue();
                    oper.isPlus = true;
                    break;
                case '−':
                    setNewValue();
                    oper.isMinus = true;
                    break;
                case '×':
                    setNewValue();
                    oper.isMul = true;
                    break
                case '÷':
                    setNewValue();
                    oper.isDiv = true;
                    break
                case '=':
                    for (let key in oper) {
                        if (oper[key]) {
                            currentOper = key;
                        }
                    }
                    currentSum = kindOfOperation(currentOper, currentSum, prevSum);
                    currentStr = currentSum;
                    output.textContent = currentStr;
                    resetOper();
                    break;
            }
        }
    })
}