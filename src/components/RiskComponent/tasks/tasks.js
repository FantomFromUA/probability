export const maxmaxCriterion = (matrix) => {
    let values = [];

    // Знаходження максимальних значень в кожному рядку
    for (let i = 0; i < matrix.length; i++) {
        let max = Number.MIN_VALUE;
        for (let j = 0; j < matrix[i].length; j++) {
            max = Math.max(max, matrix[i][j]);
        }
        values.push(max);
    }

    let maxValue = Math.max(...values);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < values.length; i++) {
        if (values[i] === maxValue) {
            for(let j = 0; j < matrix[i].length; j++){
                if(minMax === null || matrix[i][j] > minMax){
                    ans = i;
                    minMax = matrix[i][j];
                }
            }
        }
    }

    return {
        ans: ans+1,
        res: maxValue
    };
}


export const minimaxCriterion = (matrix, maximize) => {
    let values = [];

    if (maximize) {
        // Якщо наслідки - це показники, які потрібно максимізувати
        for (let i = 0; i < matrix.length; i++) {
            let min = Number.MAX_VALUE;
            for (let j = 0; j < matrix[i].length; j++) {
                min = Math.min(min, matrix[i][j]);
            }
            values.push(min);
        }
    } else {
        // Якщо наслідки - це показники, які потрібно мінімізувати
        for (let i = 0; i < matrix.length; i++) {
            let max = Number.MIN_VALUE;
            for (let j = 0; j < matrix[i].length; j++) {
                max = Math.max(max, matrix[i][j]);
            }
            values.push(max);
        }
    }

    let maxValue = maximize ? Math.max(...values) : Math.min(...values);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < values.length; i++) {
        if (values[i] === maxValue) {
            for(let j = 0; j < matrix[i].length; j++){
                if(minMax === null || matrix[i][j] > minMax){
                    ans = i;
                    minMax = matrix[i][j];
                }
            }
        }
    }

    return {
        ans: ans+1,
        res: maxValue
    };
}

export const gurvichCriterion = (matrix, alpha) => {
    let values = [];

    // Розрахунок значень за формулою Гурвіца
    for (let i = 0; i < matrix.length; i++) {
        let gurvichValue = alpha * Math.max(...matrix[i]) + (1 - alpha) * Math.min(...matrix[i]);
        values.push(gurvichValue);
    }

    let maxValue = Math.max(...values);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < values.length; i++) {
        if (values[i] === maxValue) {
            for(let j = 0; j < matrix[i].length; j++){
                if(minMax === null || matrix[i][j] > minMax){
                    ans = i;
                    minMax = matrix[i][j];
                }
            }
        }
    }

    return {
        ans: ans+1,
        res: maxValue
    };
}

export const sevidzchCriterion = (matrix) => {
    let sevidzchValues = [];

    // Знаходження максимальних значень для кожного стану середовища
    for (let i = 0; i < matrix[0].length; i++) {
        let curMax = Number.MIN_VALUE;
        for (let j = 0; j < matrix.length; j++) {
            curMax = Math.max(curMax, matrix[j][i]);
        }
        sevidzchValues.push(curMax);
    }

    // Оновлення матриці недоотриманих прибутків
    let updatedMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let updatedRow = [];
        for (let j = 0; j < matrix[0].length; j++) {
            updatedRow.push(sevidzchValues[j] - matrix[i][j]);
        }
        updatedMatrix.push(updatedRow);
    }

    let minValues = [];

    // Знаходження максимальних значень в рядках нової матриці
    for (let row of updatedMatrix) {
        let minValue = Math.max(...row);
        minValues.push(minValue);
    }

    let maxValue = Math.min(...minValues);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < minValues.length; i++) {
        if (minValues[i] === maxValue) {
            for(let j = 0; j < matrix[i].length; j++){
                if(minMax === null || matrix[i][j] > minMax){
                    ans = i;
                    minMax = matrix[i][j];
                }
            }
        }
    }

    return {
        ans: ans+1,
        res: maxValue
    };
}