// Usage: run cmd `node changelogger.js` on this dir
// CONFIG
const cf = {
  outputMdFilePath: "./../en/technical-reference/docs-changelog.md",
  repoCommitApiUrl: "https://api.github.com/repos/Midtrans/technical-documentation-site/commits?page=",
  commitKeywordToInclude: "content: ",
  commitKeywordToExcludes: ["Merge pull","hide"],
  outputPrefix: 
`# Docs Changelog
<hr>

`
}
let dd = false; // debug var
dd = true;

// library import
const utils = require('./lib-utils.js');
const path = require("path");
const fs = require("fs");

/**
* Custom implementation to generate changelog based on Github repo commit
* Dependency free, only built in Node funcs is used
*/

// main function
async function main(){
  let parsedCommitMessages = '';
  let commitGrouped = {};
  let isLastResultContainsCommit = true;
  let pageIndex = 1;
  // loop thru all page of the API, to get all commits
  while(isLastResultContainsCommit){
    // do request to Github commit API
    // @OPTIMIZE this API req: sometime if 403 error, no clear error is given
    let rawResp = await utils.getRequest(cf.repoCommitApiUrl+pageIndex);
    // add delay between req to prevent 403
    await utils.delay(1000);
    let commits = JSON.parse(rawResp);
    console.log('executed Github API req, page :: '+pageIndex);

    // stop when the page contains empty commits
    if(commits && commits.length <= 0){
      isLastResultContainsCommit = false; break;
    }
    // dd&&(pageIndex>=2)&&(isLastResultContainsCommit=false); // break early

    // loop all commits
    commits.map((commit)=>{
      let shouldExcludeThisCommit = false;
      // do nothing if commit msg doesn't include keyword
      if( !(commit.commit.message.includes(cf.commitKeywordToInclude)) ){
        shouldExcludeThisCommit = true;
      }
      // do nothing if commit msg include blacklisted keyword
      cf.commitKeywordToExcludes.map((keyword)=>{
        if(commit.commit.message.includes(keyword)){
          shouldExcludeThisCommit = true;
        }
      })
      if(shouldExcludeThisCommit){
        return 0;
      }

      let commitDateTime = new Date(commit.commit.committer.date);
      // group commit based on date
      let commitDateString = 
        `${commitDateTime.getFullYear()}/${ utils.leftZeroPad(commitDateTime.getMonth()+1)}/${utils.leftZeroPad(commitDateTime.getDate())}`;
      
      if( !(commitDateString in commitGrouped) ){
        commitGrouped[commitDateString] = [];
      }
      commitGrouped[commitDateString].push(
        commit.commit.message.replace(cf.commitKeywordToInclude,'')
      );
    });
    pageIndex++;
  }

  // generate output
  parsedCommitMessages += cf.outputPrefix;
  for(key in commitGrouped){
    parsedCommitMessages += `#### ${key} \r\n`
    commitGrouped[key].map((commitMsg)=>{
      // remove new lines, if any
      let commitMsgCleaned = commitMsg.replace(/(\r\n|\n|\r)/gm, "");
      // @HACK: remove any sub message behind `- `;
      commitMsgCleaned = (commitMsgCleaned.split('- '))[0];
      parsedCommitMessages += `- ${commitMsgCleaned}\r\n`;
    })
    parsedCommitMessages += `\r\n`;
  }
  dd&&console.log('all parsed: \r\n',parsedCommitMessages);

  // write to the output to file
  let outputMdFilePath = cf.outputMdFilePath;

  outputMdFilePath = path.join(__dirname, outputMdFilePath);
  fs.writeFileSync(outputMdFilePath, parsedCommitMessages, 'utf8');

  console.log(`==> Write Complete to`,outputMdFilePath);
}
main();