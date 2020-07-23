// Usage: run cmd `node sitemapper.js`
// CONFIG
const cf = {
    // Add any sidebar or file w/ list of urls to array below
    sidebarFiles: [
        "./../_sidebar.md",
        "./../en/payments/_sidebar.md",
        "./../id/_sidebar.md"
    ],
    outputXmlPath: "./../sitemap.xml",
    urlPriority:"0.75",
    sitePrefix: "https://beta-docs.midtrans.com/", // append this prefix to url
    removeSuffix: ".md", // delete this suffix from url
    ignorePrefix: "http", // any url that have this prefix will not be modified
    excludeUrl: ".svg",
    removePathPrefix: "/",
    regex: {
        /**
        * Explained:
        * `(?:\]|\] *)` start with "]" or "]<any-number-of-whitespace>"
        * `/(?:\()` match "("
        * `(.*?)` any text, captured as [1]
        * `(?:\)| .*\))` ended with ")" or "<whitespace><any-text>)"
        * e.g: `[Snap] (en/snap/overview.md "Midtrans - Snap Technical Documentation")`
        * match: `en/snap/overview.md`
        */
        parseLink: /(?:\]|\] *)(?:\()(.*?)(?:\)| .*\))/gm
    }
}
let dd = false; // debug var
// dd = true;

/**
* Custom implementation to generate sitemap
* Dependency free, only built in Node funcs is used
* @OPTIMIZE: these procedural codes to functions
* @OPTIMIZE: maybe make this script a CLI tool w/ https://www.npmjs.com/package/commander
*/

// MAIN SCRIPT
let path = require("path");
let fs = require("fs")
// `Date.toW3CString()` based on https://gist.github.com/tristanlins/6585391
Date.prototype.toW3CString=function(){var f=this.getFullYear();var e=this.getMonth();e++;if(e<10){e="0"+e}var g=this.getDate();if(g<10){g="0"+g}var h=this.getHours();if(h<10){h="0"+h}var c=this.getMinutes();if(c<10){c="0"+c}var j=this.getSeconds();if(j<10){j="0"+j}var d=-this.getTimezoneOffset();var b=Math.abs(Math.floor(d/60));var i=Math.abs(d)-b*60;if(b<10){b="0"+b}if(i<10){i="0"+i}var a="+";if(d<0){a="-"}return f+"-"+e+"-"+g+"T"+h+":"+c+":"+j+a+b+":"+i};

// Read all sidebar files
let rawSidebarText = "";
cf.sidebarFiles.map((sidebarPath)=>{
    rawSidebarText += fs.readFileSync(path.join(__dirname, sidebarPath), 'utf8');
    rawSidebarText += "\r\n"
})

dd&&console.log(rawSidebarText);

// Use regex to parse urls
let str = rawSidebarText;
let regex = cf.regex.parseLink;
let parsedUrls = [];

let match;
while ((match = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) { regex.lastIndex++; }
    // The result can be accessed through the `match``
    parsedUrls.push(match[1]);
}

dd&&parsedUrls.map(url=>console.log(url));

// finalize urls
let sitePrefix = cf.sitePrefix;
let ignorePrefix = cf.ignorePrefix;
let removeSuffix = cf.removeSuffix;
let removePathPrefix = cf.removePathPrefix;
let excludeUrl = cf.excludeUrl;
// full of @HACK: might not extensively tested
let cleanUrls = parsedUrls.map((url)=>{
    if(url.startsWith(ignorePrefix)){
        dd&&console.log(">>> ignored",url);
        return url;
    }
    let cleanUrl = url;
    // remove any `.md` suffix
    cleanUrl = cleanUrl.replace(removeSuffix,"");
    if(cleanUrl.startsWith(removePathPrefix)){
        cleanUrl=cleanUrl.substring(removePathPrefix.length);
    }
    cleanUrl = sitePrefix+cleanUrl;
    return cleanUrl;
})
cleanUrls = cleanUrls.filter(url=>!url.includes(excludeUrl));
// filter out any external (different domain) link
cleanUrls = cleanUrls.filter(url=>url.includes(sitePrefix));
// @HACK: remove `/#/` from 1st url, which is homepage
cleanUrls[0] = cleanUrls[0].replace("/#/","");

// output
dd&&console.log("=================== final")
dd&&cleanUrls.map(e=>console.log(e));

// generate XML
let outputXml = "";
outputXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
let lastmod = (new Date()).toW3CString();
let urlPriority = cf.urlPriority;
cleanUrls.map((url)=>{
    // @OPTIMIZE: hardcoded priority of `0.7`, use proper priority
    outputXml+=
`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${urlPriority}</priority>
  </url>
`
})
outputXml += `</urlset>`;

dd&&console.log(outputXml);
// write the file
let outputXmlPath = cf.outputXmlPath;

outputXmlPath = path.join(__dirname, outputXmlPath);
fs.writeFileSync(outputXmlPath, outputXml, 'utf8');

console.log(`==> Write Complete to`,outputXmlPath);