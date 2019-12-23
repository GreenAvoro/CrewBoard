
const getOrdinals =require('./getOrdinals')

function toDateString(date_s) {
    let date = new Date(date_s)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return `${days[date.getDay()]}
            ${date.getDate()}${getOrdinals(date.getDate())}
            ${months[date.getMonth()]}`
}

module.exports = toDateString