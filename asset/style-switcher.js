/** 
* Based on https://jhildenbiddle.github.io/docsify-themeable/assets/js/main.js 
*/
(function() {
    // Functions
    // =========================================================================
    /**
     * Adds event listeners to change active stylesheet and restore previously
     * activated stylesheet on reload.
     *
     * as style switch trigger, it require:
     *    - `<a>` tag
     *    - With `title` attribute, prefixed with `style::`
     *    - Put the style name after prefix
     * as target, it will activate:
     *    - One or multiple `<link>` tag
     *    - Which `title` attribute matched the `<a>` tag's `title` attribute
     *
     * @example:
     * This <a> tag:
     *   <a href="#" title="style::dark">Switch to Dark theme</a>
     *   - Note: Docsify markdown version = [Switch to Dark theme](# 'style::dark')
     * Will activate this existing <link> tags:
     *   <link rel="stylesheet alternate" title="style::dark" href="path/to/dark-style.css" >
     *   <link rel="stylesheet alternate" title="style::dark" href="path/to/dark-style-2nd-file.css" >
     * And deactivate these <link> tags with `style::` prefixed title:
     *   <link rel="stylesheet" title="style::OtherThanDark" href="path/to/OtherThanDark-style.css" >
     *
     * @example usage:
     * List all the available styles, Light style as default
     *   <link rel="stylesheet" title="style::light" href="path/to/light-style.css" >
     *   <link rel="stylesheet alternate" title="style::dark" href="path/to/dark-style.css" >
     *   <link rel="stylesheet alternate" title="style::dark" href="path/to/dark-style-2nd-file.css" >
     *   <link rel="stylesheet alternate" title="style::blue" href="path/to/blue-style.css" >
     * Triggers to switch
     *   <a href="#" title="style::dark">Switch to Dark theme</a>
     *   <a href="#" title="style::light">Switch to Light theme</a>
     *   <a href="#" title="style::blue">Switch to Blue theme</a>
     */
    function initStyleSwitcher() {
        var isInitialzed      = false;
        var sessionStorageKey = 'activeStylesheetHref';
        var titlePrefix = 'style::';

        function handleSwitch(activeTitle) {
            var activeElm = document.querySelector('link[title="' + activeTitle +'"]');
            setActiveLink(activeElm);
        }

        function setActiveLink(activeElm) {
            var activeHref   = activeElm.getAttribute('href');
            var activeTitle  = activeElm.getAttribute('title');
            var inactiveElms = document.querySelectorAll(
                'link[title^="' + titlePrefix + '"]:not([href*="' + activeHref +'"]):not([title="' + activeTitle +'"])');

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
            sessionStorage.setItem(sessionStorageKey, activeTitle);

            // Disable other elms
            inactiveElms.forEach(function(elm){
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
            });

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
                var activeTitle = sessionStorage.getItem(sessionStorageKey);

                if (activeTitle) {
                    handleSwitch(activeTitle);
                }
            });

            // Update active stylesheet
            /** 
            * @OPTIMIZE: this will add event listener on all click
            */
            document.addEventListener('click', function(evt) {
                var dataTitle = evt.target.getAttribute('title');
                if(!dataTitle){ return 0; }
                var dataTitleIncludePrefix = dataTitle.toLowerCase().includes(titlePrefix);
                if(!dataTitleIncludePrefix){ return 0; }

                dataTitle = dataTitle
                    || evt.target.textContent
                    || '_' + Math.random().toString(36).substr(2, 9); // UID

                handleSwitch(dataTitle);
                evt.preventDefault();
            });
        }
    }

    // Main
    // =========================================================================
    initStyleSwitcher();
})();