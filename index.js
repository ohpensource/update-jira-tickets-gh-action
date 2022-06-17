const git = require("./modules/git.js");
const ticketParser = require("./modules/ticket-parser.js");
const jiraRepo = require("./modules/jira-ticket-repository.js");
const logger = require("./modules/logger.js");
const core = require('@actions/core');

const JIRA_FIELD_NAME = core.getInput('jira-field-name', { required: true });
const JIRA_FIELD_VALUE = core.getInput('jira-field-value', { required: true });

logger.logAction('Versions')
const tags = git.getLatestTwoTags()
logger.logKeyValuePair(`tags`, tags)
commits = git.getCommitsBetweenTags(tags[1], tags[0])

logger.logAction('Commits')
commits.forEach((x, i) => {
    logger.logKeyValuePair(`commit ${i}`, x)
});

logger.logAction('Tickets')
let tickets = []
commits
    .forEach(x => {
        const ticketsFromSubject = ticketParser.getTickets(x.subject)
        const ticketsFromBody = ticketParser.getTickets(x.body)
        ticketsConcatenated = [...tickets, ...ticketsFromSubject, ...ticketsFromBody]
        tickets = [...new Set(ticketsConcatenated)] // getting unique values
    })

tickets.forEach(ticket => {
    logger.logAction(`updating ticket ${ticket}`)
    jiraRepo.updateJIRATicketField(ticket, JIRA_FIELD_NAME, JIRA_FIELD_VALUE)
});
