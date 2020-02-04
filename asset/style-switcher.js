/** 
* Based on https://jhildenbiddle.github.io/docsify-themeable/assets/js/main.js 
*/
(function() {
    // Functions
    // =========================================================================
    /**
     * Adds event listeners to change active stylesheet and restore previously
     * activated stylesheet on reload.
     * @customized:
     * - Replaced to use `title` attribute for <a> instead of `data-title`
     * So it can be rendered from markdown e.g `[Foo](# 'style::Foo')`
     * it require `style::` prefix on the `title` attribute
     * - Edited to activate all <link> element with target "style::title", 
     * instead of previously just 1 element. So we can have two or more <link>
     * activated with just one <a> trigger
     *
     * @example
     *
     * This link:
     *   <a href="#" title="style::Foo">Foo</a>
     * Will active all of these existing links:
     *   <link rel="stylesheet alternate" title="style::Foo" href="..." >
     *   <link rel="stylesheet alternate" title="style::Foo" href="...other css...">
     *
     * @example
     *
     * This link:
     *   <a href="#" data-link-href="path/to/file.css">Bar</a>
     * Will activate this existing link:
     *   <link rel="stylesheet alternate" title="style::Bar" href="path/to/file.css" >
     * Or generate this active link:
     *   <link rel="stylesheet" title="style::Bar" href="path/to/file.css" >
     */
    function initStyleSwitcher() {
        var isInitialzed      = false;
        var sessionStorageKey = 'activeStylesheetHref';
        var titlePrefix = 'style::';

        function handleSwitch(activeHref, activeTitle) {
            var activeElm = document.querySelector('link[href*="' + activeHref +'"],link[title="' + activeTitle +'"]');

            if (!activeElm && activeHref) {
                activeElm = document.createElement('link');
                activeElm.setAttribute('href', activeHref);
                activeElm.setAttribute('rel', 'stylesheet');
                activeElm.setAttribute('title', activeTitle);

                document.head.appendChild(activeElm);

                activeElm.addEventListener('load', function linkOnLoad() {
                    activeElm.removeEventListener('load', linkOnLoad);
                    setActiveLink(activeElm);
                });
            }
            else if (activeElm) {
                setActiveLink(activeElm);
            }
        }

        function setActiveLink(activeElm) {
            var activeHref   = activeElm.getAttribute('href');
            var activeTitle  = activeElm.getAttribute('title');
            var inactiveElms = document.querySelectorAll('link[title]:not([href*="' + activeHref +'"]):not([title="' + activeTitle +'"])');

            // CUSTOM OVERRIDE to allow all Simple Dark titled CSS to be activated together
            // so now all CSS tag with same activeTitle will all be activated together in group
            var activeElms = document.querySelectorAll('link[title="' + activeTitle +'"]');
            activeElms.forEach(function(activeElm){
                // Remove "alternate" keyword
                activeElm.setAttribute('rel', (activeElm.rel || '').replace(/\s*alternate/g, '').trim());

                // Force enable stylesheet (required for some browsers)
                activeElm.disabled = true;
                activeElm.disabled = false;
            })

            // Store active style sheet
            sessionStorage.setItem(sessionStorageKey, activeHref);

            // Disable other elms
            for (var i = 0; i < inactiveElms.length; i++) {
                var elm = inactiveElms[i];

                elm.disabled = true;

                // Fix for browsersync and alternate stylesheet updates. Will
                // cause FOUC when switching stylesheets during development, but
                // required to properly apply style updates when alternate
                // stylesheets are enabled.
                if (window.browsersyncObserver) {
                    var linkRel    = elm.getAttribute('rel') || '';
                    var linkRelAlt = linkRel.indexOf('alternate') > -1 ? linkRel : (linkRel + ' alternate').trim();

                    elm.setAttribute('rel', linkRelAlt);
                }
            }

            // CSS custom property ponyfil
            if ((window.$docsify || {}).themeable) {
                window.$docsify.themeable.util.cssVars();
            }
        }

        // Event listeners
        if (!isInitialzed) {
            isInitialzed = true;

            // Restore active stylesheet
            document.addEventListener('DOMContentLoaded', function() {
                var activeHref = sessionStorage.getItem(sessionStorageKey);

                if (activeHref) {
                    handleSwitch(activeHref);
                }
            });

            // Update active stylesheet
            /** 
            * @OPTIMIZE: this will add event listener on all click
            * Optimize me so that it will only add to link with specific attribute?
            */
            document.addEventListener('click', function(evt) {
                var dataHref  = evt.target.getAttribute('data-link-href');
                var dataTitle = evt.target.getAttribute('title')
                var dataTitleIncludePrefix = dataTitle? 
                    dataTitle.toLowerCase().includes(titlePrefix):
                    false;

                if (dataHref || dataTitleIncludePrefix) {
                    dataTitle = dataTitle
                        || evt.target.textContent
                        || '_' + Math.random().toString(36).substr(2, 9); // UID

                    handleSwitch(dataHref, dataTitle);
                    evt.preventDefault();
                }
            });
        }
    }

    // Main
    // =========================================================================
    initStyleSwitcher();
})();