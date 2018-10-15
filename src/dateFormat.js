var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];

var digitFix = function(digit) {
    var d = digit.toString();
    if (d.length == 1) {
        return "0" + d;
    } else {
        return digit;
    }
};

export function formatDate(date) {
    var d = new Date(date);
    var dateString =
        monthNames[d.getMonth()] +
        " " +
        d.getDay() +
        ", " +
        d.getFullYear() +
        ", " +
        digitFix(d.getHours()) +
        ":" +
        digitFix(d.getMinutes());
    return dateString;
}
