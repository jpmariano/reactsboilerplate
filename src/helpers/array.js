export const arrayHelpers = {
    existsIn2dArray,
    createArrayofNums
};

function existsIn2dArray(arr, item1, item2) {
    return arr.some(row => row.includes(item1) && row.includes(item2));
}

function createArrayofNums(limit) {
    const numArray = [];

    for (let i = 0; i <= limit; i++) {
        numArray.push({ value: i });
    }

    return numArray;
}