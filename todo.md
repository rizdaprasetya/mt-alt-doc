# TODO:

## UI

- Add dark mode switch, ref - done
	- https://github.com/docsifyjs/docsify/issues/740
- Research for current page sidebar menu to be moved right
- Add ::before/::after UI element for card link - cancel
	- didnt looks good
- Add collapsible element - done
- Add tool tip on hover for certain terms
	- https://kazzkiq.github.io/balloon.css/

## Tech

- Workaround for slow page load on subfolder - done
	- need to revisit for ID sidebar - done
- Feedback form using google form, but with embedd form - done, via iframe
	- ref: https://stackoverflow.com/a/47444396
- Like dislike btn per page - done
	- ref: view-source:https://pzkt1.csb.app/?id=bike
- Verify external script with SRI to ensure 3rd party script isn't compromised - done, not all
- Develop Google Appscript as `/charge` middleware, add interactive demo that JSON payload is customizable
- Replace unexpected mixpanel link_tracks reload behaviour - done
- add Sentry JS error alerting/monitoring
- fix like btn on mobile not loaded on 2nd page navigation
- Use GTM to replace GA - cancelled
	- https://www.analyticsmania.com/post/single-page-web-app-with-google-tag-manager/
	- https://unpkg.com/docsify@4.10.2/lib/plugins/ga.js
	- https://www.analyticsmania.com/post/how-to-install-google-tag-manager/
- Follow sample code section confuse people to open github
- check & fix search exception on `cms` `plugin` `status` keyword
- check & fix next/previous page extension, seems doesn't work - done
- check and patch any XSS potential on any input from URL, eg: part when reading split of `#/` from urls

## Content

- Add Snap tech integration docs - done
- Add JS fiddle sample for Snap.js - done
- Add Codesandbox sample for Snap - done
- Add collapsible on useful optional like snap.js callbacks, transaction_details - done
- Sandbox test credential - done
- Embedd JS fiddle/bin demo on Snap integration guide - done
- Embedd JS fiddle/bin demo on advanced feature
- Embedd ~Repl.it~ codesandbox demo on backend step - done
- Embedd JS fiddle for auth string builder tool - done
- Embedd JS fiddle for signature key string verifier - done
- Embedd Repl.it demo for Core API payment types
- Diagram for transaction status cycle
- Replace any `?id=xxx` absolute link with `#xxx` version, because actually docsify able to handle it - done
- Recurring core API section
- ID translation
- add default SNAP token expiry
	- add default expiry info for any other expiry
- add info of Gopay is QRIS compatible
- README grammar fix
- add section on how to report/ask about technical issue, with Dos' and Don'ts samples
- add FAQ on [logging mobile sdk server issue](https://gojek.slack.com/archives/GECL62BJ7/p1582001857016400?thread_ts=1581866679488400&cid=GECL62BJ7)
- add CC 3DS/OTP `redirect_url` expiry time, fixed 10mins, and the callback
- add what is being validated on which step of CC, why invalid card can get redirect_url
- add Gopay sim web scanner implementation on docs
- explain Gopay sandbox sim limitation, etc. - done
- add info that QR/deeplink url on snap is not retrievable
- add section for BIN API
- add section for Subscription API
- info about ` To display this credit card edit form do we need to comply with any PCI Standard?`
- info about going live / switching to production
	- checklist page?
	- add on each guide's what's next section
- add more link to simulator on each of payment demo/guide
- add warning of max API payload size
- add QRIS compatible note on Gopay payment method doc
- add how to get alfamart code for simulator
- status cycle missing `chargeback` status. - done
- POS/iOT specific integration guide
- documentate of notif fail because of 3xx redirect
	- for plugin
- Example for merchant, to create something like donation form integrated with Snap
- handle 404 to prevent index.html being loaded - done
- best practice/sample to redirect customer to `gojek://` app deeplink
- add production endpoint on Core API sections - done
- add production endpoint on Snap API sections - done
- remove any `.` on each notif url example, because it cause confusion - done