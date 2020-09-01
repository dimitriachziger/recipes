/**
 * Prueft ob die vorliegende Zahl den Wert 1 hat
 * @param {*} num zu pruefende Zahl
 * @returns Zahl = 1 -> true sonst false
 */
function checkNumber(num) {
        return num === 1;
};
module.exports = {
    "single": checkNumber
}