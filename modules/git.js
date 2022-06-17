const exec = require('@actions/exec');

const child = require("child_process");
const splitText = "<#@112358@#>";
const prettyFormat = [
  "%h",
  "%H",
  "%s",
  "%f",
  "%b",
  "%at",
  "%ct",
  "%an",
  "%ae",
  "%cn",
  "%ce",
  "%N",
  "",
];

const getCommitsBetweenTags = (oldestTag, newestTag) => {
  let commits = child
    .execSync(
      `git log ${oldestTag}..${newestTag} --no-merges --pretty=format:"${prettyFormat.join(
        splitText
      )}"`
    )
    .toString("utf-8")
    .split(`${splitText}\n`)
    .map((commitInfoText) => getCommitInfo(commitInfoText));

  return commits;
};

const getCommitInfo = (commitToParse) => {
  let commitInfoAsArray = commitToParse.split(`${splitText}`);
  var branchAndTags = commitInfoAsArray[commitInfoAsArray.length - 1]
    .split("\n")
    .filter((n) => n);
  var branch = branchAndTags[0];
  var tags = branchAndTags.slice(1);

  return {
    shortHash: commitInfoAsArray[0],
    hash: commitInfoAsArray[1],
    subject: commitInfoAsArray[2],
    sanitizedSubject: commitInfoAsArray[3],
    body: commitInfoAsArray[4],
    authoredOn: commitInfoAsArray[5],
    committedOn: commitInfoAsArray[6],
    author: {
      name: commitInfoAsArray[7],
      email: commitInfoAsArray[8],
    },
    committer: {
      name: commitInfoAsArray[9],
      email: commitInfoAsArray[10],
    },
    notes: commitInfoAsArray[11],
    branch,
    tags,
  };
};

getLatestTwoTags = () => child
  .execSync(`git tag --sort=-version:refname | head -n 2`)
  .toString("utf-8")
  .split(`\n`)
  .filter(x => x.toString().length > 0)

module.exports = {
  getLatestTwoTags,
  getCommitsBetweenTags
};