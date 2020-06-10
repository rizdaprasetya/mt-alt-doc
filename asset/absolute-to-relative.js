/**
* Incase of docsify is on subdirectory and on hash mode
* Custom script to handle invalid asset link
* from absolute `/asset/...` to relative `asset/..`
* like `localhost/docs/midtrans-alt-doc/#/`
*/
(function replaceAbsoluteResourceWithRelative(){
    // check if this script is loaded `/asset/absolute-to-relative-check.js``
    if (!window.absoluteResourceLoaded){
        // return 0;
        let dd = document.location.href.indexOf("://localhost") >= 0;
        dd&&console.log("> initiating absolute-to-relative for CSS & JS");
        let addScriptToPageHead = function(script){
            let scriptWrapper = document.createElement('script');
            (Array.from(script.attributes)).forEach(function(attr){
                scriptWrapper.setAttribute(attr.name,script.getAttribute(attr.name));
            });
            document.getElementsByTagName('head')[0].appendChild(scriptWrapper);
            dd&&console.log("script attached:",scriptWrapper);
        }

        let replaceAllCssAbsToRel = function(){
            // @NOTE: actually also including all non CSS <link>, including favicon
            let links = Array.from(document.querySelectorAll('link[href^="/asset/"]'));

            links.forEach(function(link){
                // dd&&console.log(">- replacing",link.href);
                link.href = "asset/"+link.href.split("/asset/")[1];
                // dd&&console.log(">-- with",link.href);
            })
        }
        let addAllJsAbsToRel = function(){
            let scripts = Array.from(document.querySelectorAll('script[src^="/asset/"]'));
            scripts.forEach(function(script){
                // reattachScript(script); return 0;
                script.src = "asset/"+script.src.split("/asset/")[1];
                addScriptToPageHead(script);
            })
        }

        replaceAllCssAbsToRel();
        addAllJsAbsToRel();
    }
})();