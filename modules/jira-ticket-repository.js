const https = require('https');
const core = require('@actions/core');

const JIRA_HOSTNAME = core.getInput('jira-hostname', { required: true });
const JIRA_USER_EMAIL = core.getInput('jira-user-email', { required: true });
const JIRA_API_TOKEN = core.getInput('jira-api-token', { required: true });

const updateJIRATicketField = (ticket, field, value) => {
    const requestBody = JSON.stringify({ update: { [field]: [{ set: value }] } })

    const requestOption = {
        hostname: JIRA_HOSTNAME,
        port: 443,
        path: `/rest/api/2/issue/${ticket}`,
        method: 'PUT',
        auth: `${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestBody.length,
        },
    }

    const req = https.request(requestOption, resp => {
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            if (data) {
                console.log(JSON.parse(data))
            }
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(requestBody);
    req.end();
}

module.exports = {
    updateJIRATicketField
}