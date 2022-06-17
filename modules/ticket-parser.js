const REGEX_DETECT_TICKET = /[a-zA-Z]{2,10}-\d+/g

const getTickets = (commitMsg) => {
    let result = []
    const matchResult = commitMsg.match(REGEX_DETECT_TICKET)
    if (matchResult) {
        matchResult.forEach(x => result.push(x))
    }
    return result
};

module.exports = {
    getTickets
};