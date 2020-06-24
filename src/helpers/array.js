export const arrayHelpers = {
    existsIn2dArray,
};

function existsIn2dArray(arr, item1, item2) {
    return arr.some(row => row.includes(item1) && row.includes(item2));
}