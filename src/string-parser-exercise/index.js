
const referenceData = {
    'ab49fd20': {
        key_1: 'some data'
    },
    '9822df87': {
        another_key: 'big data',
        yet_another_key: 'small data'
    }
}

const inputData = 'This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }} and also {{ ab49fd20.key_2 }}.'


const replace = (inputString) => {
    
    let result = inputString.replace(/{{ [a-f0-9]{8}\.[\w]+ }}/g, function (dotDelimtedCode) {
        
        const cleanedAndSplitCodes = dotDelimtedCode.replace('{{ ', '').replace(' }}', '').split(".")

        return referenceData[cleanedAndSplitCodes[0]][cleanedAndSplitCodes[1]] || 'nothing'
      });
    
      return result
}

console.log(`\nInput data is   : ${inputData}\n` );
console.log(`Replaced data is: ${replace(inputData)}\n` );