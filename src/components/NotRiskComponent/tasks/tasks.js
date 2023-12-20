export const bayesianCriterion = (matrix, p) => {
    const z = matrix.map((row) => {
        let zi = 0;
        for (let i = 0; i < row.length; i++) {
          zi += row[i] * p[i];
        }
        return zi;
      });
    
      // Знаходження альтернатив, які мають максимальне значення
      const maxValue = Math.max(...z);

      let minMax = -110000;
      let ans = 0;

      for(let i = 0; i < z.length; i++){
        if(maxValue === z[i]){
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

export const minimizationOfDispersionCriterion = (matrix, p) => {
    let z = [];

    // Знаходження zi-тих значень в кожному рядку
    for (let i = 0; i < matrix.length; i++) {
        let zi = 0;
        let tempSum = 0;

        for (let j = 0; j < matrix[i].length; j++) {
            tempSum += matrix[i][j] * p[j];
            zi += Math.pow(matrix[i][j], 2) * p[j];
        }

        zi -= Math.pow(tempSum, 2);
        z.push(Math.sqrt(zi));
    }

    // Знаходження альтернатив, які мають мінімальне значення
    let minValue = Math.min(...z);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < z.length; i++) {
        if (z[i] === minValue) {
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
        res: minValue
    };
}

export const maximizationOfProbability = (matrix, p, a) => {
    let z = [];

    // Знаходження zi-тих значень в кожному рядку
    for (let i = 0; i < matrix.length; i++) {
        let zi = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= a) {
                zi += p[j];
            }
        }
        z.push(zi);
    }

    // Знаходження альтернатив, які мають максимальне значення
    let maxValue = Math.max(...z);

    let ans = 0;
    let minMax = null;

    for (let i = 0; i < z.length; i++) {
        if (z[i] === maxValue) {
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

export const modalCriterion = (matrix, p) => {
    let z = [];
    let p0 = Math.max(...p);
    let maxPCount = 0;

    for(let i = 0; i < p.length; i++)
        if (p[i] === p0) {
            maxPCount += 1;
        }
        if (maxPCount > 1) {
            return {
                ans: "Найоптимальніший варіант за модальним критерієм не може бути визначений, так як кількість максимальних ймовірностей більша за 1"
            }
        }

    let p0Index = p.indexOf(p0);

    // Знаходження zi-тих значень в кожному рядку
    matrix.forEach(row => {
        z.push(row[p0Index]);
    });

    // Знаходження альтернатив, які мають максимальне значення
    let maxValue = Math.max(...z);
    let ans = 0;
    let minMax = null;

    for (let i = 0; i < z.length; i++) {
        if (z[i] === maxValue) {
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