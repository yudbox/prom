var name = 'Alex'
let name2 = 'Alex'

const getNumbers = (...args) => {
    console.log('args', args);
}
const variable = {name: 'Alex'}
getNumbers(1,2,'dsbfmn', variable)

const getCount = () => {
    let count = 0
    return () => {
        count++
        console.log('count', count);
    }
}

const calculate = getCount()

calculate()
calculate()
calculate()
calculate()
calculate()
calculate()
calculate()
calculate()
calculate()

export const maxLengthCreator = (maxLength) => value => {
    if (value && value.length > maxLength) {
        return `Max length more than ${maxLength}`;
    }
    return undefined;
}