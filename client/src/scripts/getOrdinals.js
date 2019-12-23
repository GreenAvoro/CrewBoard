function getOrdinals(num){
    if(num === 1 || num === 21 || num === 31) return "st"
    else if(num === 2 || num === 22) return "nd"
    else if(num === 3 || num === 23) return "rd"
    else {
        return "th"
    }
}

module.exports = getOrdinals