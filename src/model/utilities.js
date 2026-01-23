export function containsIgnoreCase(array, value) {
    if(!value) return false;
    const lowerCaseValue = value.toLowerCase();
    return array.some(function (item) { 
        return item.toLowerCase() === lowerCaseValue; 
    });
}

export function allInArray(items, allowed) {
    return items.every(function (item) {
        return allowed.indexOf(item) !== -1;
    });
}