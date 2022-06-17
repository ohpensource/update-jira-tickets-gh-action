# update-jira-tickets-gh-action
GH action that updates JIRA tickets. The action will look for commits between the latest two tags, find the associated JIRA tickets and update them accordingly to the release. The update will only change the field provided by the user.

# How to work with this repo

```yml
jobs:
  update-version-in-tickets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: update last release tickets
        uses: ohpensource/update-jira-tickets-gh-action@v0.0.1
        with:
          jira-hostname: ${{ secrets.JIRA_HOST_NAME }}
          jira-user-email: ${{ secrets.JIRA_USER_EMAIL }}
          jira-api-token: ${{ secrets.JIRA_API_TOKEN }}
          jira-field-name: "deployment"
          jira-field-value: "ticket-release-2022-06-17"
```

# Remarks

For custom fields you create in JIRA you must provide the name with the id as `customfield_10246``

# Ideas for using this

* use this GH action after you release a new version of your APP. You can use the GH action [generate-version-and-release-notes-gh-action](https://github.com/ohpensource/generate-version-and-release-notes-gh-action).