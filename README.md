# Instruction

<details>
<summary><b>Tech Stack Summary </b>(click to expand)</summary>
<article>

### Tech Stack
- [Docsify](https://docsify.js.org/) as **JS based frontend-framework**, can also be considered as the CMS.
- Content is written as `Markdown`, stored on Github repo.
- Continuous Delivery configured to **auto deploy** to `Netlify` (frontend hosting service), served as static files.
- Netlify also act as an **optional router**.
- Somekind of `frontend-only` **Single Page Application**.
- Requires `no backend, no DB`, any web server (like Nginx) will just work (as it is not full stack CMS).
- Consist of regular `HTML, JS, CSS,` files, which will auto render the `Markdown` content on runtime.

</article>
</details>

## Usage

- Download/clone and extract this folder to your local machine.
- Run any local webserver and make sure you can open the `index.html` from the webserver. For example:
	- You can run MAMP/XAMPP and copy this project folder to your `htdocs` folder. Access it from localhost url.
	- You can run Python `python -m SimpleHTTPServer`, and open `localhost:8000/index.html`.
	- You can use [Serve NPM package](https://www.npmjs.com/package/serve) on NodeJS
	- Or even from browser itself, via [Chrome Web Server Extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)
	- Or preview online with codesandbox: https://codesandbox.io/s/github/rizdaprasetya/mt-alt-doc
	- etc.
- Open web browser and point it to the `index.html` file. i.e: `localhost/mt-alt-doc/index.html`.
- Live preview from Github repo are might also be possible:
	- Preview using Githack: https://raw.githack.com/Midtrans/technical-documentation-site/master/#/
	- Change `master` with any branch you want to preview
	- Note: Githack is free service so it might not be always available

## Structure & Standard

- Documentation content are located at `en` (english) & `id` (indonesia) folder. i.e: `/en/snap/overview.md`.
- Subfolder are grouped in accordance with how it listed in Sidebar Menu. i.e: snap, midtrans_account, etc.
- Docs content are in markdown format.
- Docs content can contain html tags, but please use markdown as much as possible, to minimize custom html tags.
- Url/links:
	- For best compatibility, please use absolute path like `/en/snap/overview.md`, instead of `en/snap/overview.md`
	- If the link refer to some html id, use this `/en/snap/overview.md#integration`, instead of `?id=integration`
- Sidebar menu is rendered from `_sidebar.md` file
	- Link title will be used as the page title, to define title, e.g: `- [menu name](/en/menu/path.md "Page Title Here")`
- This project are using [Docsify](https://docsify.js.org/).
- `index.html` contains all the Docsify script, plugins, and config.
	- External `css`,`js` file dependencies (`<script>` tag) should have ["intigrity" SRI attribute](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). e.g: use [jsdelivr.com](https://www.jsdelivr.com/package/npm/prismjs?version=1.17.1&path=components), click `copy HTML + SRI`.
	- SRI is additional security protection against external file being modified by unauthorized party.
- custom css & js can be embedded in `index.html` and also located at `asset` folder.
- image asset are in `asset/image` folder.

## Editing Content

- Edit the markdown docs content within `en` & `id` folder.
- To add/edit/remove sidebar menu, edit `_sidebar.md` file.
- After editing, just refresh from browser.
	- Sometimes browser refresh might fail to load new editted content like sidebar or current page content because browser didn't load the modified file but load from cache, workaround: 
		- On the page `Right Click > Inspect` (open Chrome dev tools)
		- Go to tab `Network`
		- Click checkbox `Disable cache`
		- Refresh browser while dev tools still open (alternatively `cmd + shift + R` to hard refresh)
- Generate `sitemap.xml` file for SEO purpose, by: 
	- Modify `config` within `tooling/sitemapper.js` if needed
		- If you add new sidebar files, add the path to `sidebarFiles`
	- Run `node tooling/sitemapper.js` from project folder
		- or, go to "tooling" folder: `cd tooling`, run `node sitemapper.js`

### Custom CSS elements
There are some custom elements to make UX better:

#### Tabs
Using [docsify tabs plugin](https://jhildenbiddle.github.io/docsify-tabs), sample usage

```markdown
<!-- tabs:start -->
#### **Tabs title 1**
Tabs content 1

#### **Tabs title 2**
Tabs content 2
<!-- tabs:end -->
```

#### Collapsible
Custom implementation. 
Sample usage via native html `details` & `summary` tag (recommended, also markdown compatible): 

```html
<details>
<summary><b>Collapsible Title</b></summary>
<article>

The overall Snap end-to-end payment proccess can be illustrated in following sequence diagram:
</article>
</details>
```

Or via custom div elements (not recommended, not markdown compatible and need to manage unique id)

```html
<input id="unique-id" class="collaps-toggle" type="checkbox">
<label for="unique-id" class="collaps-label"><b>Collapsible Title</b></label>
<div class="collaps-content">

input's "id" attribute must be unique from other collapsible instances, and must match with "for" attribute of the label.
</div>
```

#### Card
Custom implementation, sample usage:

```html
<div class="my-card">

### [Card Title With Link (optional)](https://example.com)
Optional card body content, or actually you can use any html/markdown content within card.
</div>
```

## Deploying

- Just pull request or commit to `master` branch.
- Commit pushed to `master` branch are auto-deployed to https://mt-alt-doc.netlify.com .

## Using Docker (and Compose)

- Using `nginx:alpine` image
- By default, docker file will `COPY` the necessary files from project dir at build time.
	- Changes on runtime will not be reflected.
	- Probably ideal for deployment, but not for development.
	- Usage:
		- Build image: `docker build -t <username-or-anything>/staticsite:1.0 .`.
		- Run as container: `docker run -itd --name <container-name> --publish 20080:80 <username-or-anything>/staticsite:1.0`.
		- It will be accessible under `localhost:20080` on host machine.
- For development easier to use **docker-compose**:
	- Because it will use `volume`, so changes is realtime.
	- Usage:
		- Run with docker compose `docker-compose up -d`.
		- if doesn't work try building the container 1st `docker-compose up --build -d`.
		- It will be accessible under `localhost:20080` on host machine.
	- Stopping
		- To stop run `docker-compose stop`
		- To stop and remove container `docker-compose down`
	- Advanced:
		- ssh to container: `docker exec -it nginx_static /bin/sh` on runtime
		- restart nginx to apply new config on ssh: `/usr/sbin/nginx -s reload`


## Additional Notes
<details>
<summary>Additional Notes - (Click to expand)</summary>
<article>

### CodeAnotation
Within the source code, there were some code annotated with:
- `TODO:` - not implemented, reminder to implement on the future
- `HACK:` - code that works at that time and specific. Probably used to fix/override some issue, may not be tested for extended usage and may break unexpectedly, should be fixed/optimized on the future.
- `OPTIMIZE:`- code that works, but may not be the best in terms of performance, etc. should be optimized on the future.
- `FIXME:` - note to fix the code in the future, current implementation may be broken.
- etc

Pay attention to these when you encounter unexpected issue. Some hack implementation or un-optimized code may be the cause of that issue. Read the note that come after that annotation on the code, it usually explains what is happening.

### Docsify Router Mode
Docsify as SPA (Single Page App) [support 2 different router mode](https://docsify.js.org/#/configuration?id=routermode), with different behaviour:

#### `hash`
- Handle page navigation within using single entry point of `index.html`, using `/#/page-url` hash route to differentiate route between pages. Using JS to read the hash route.
- Hash mode is easier to handle on local dev env, especially if you put the project under sub-directory. e.g: `/localhost/project/subdir/project-folder`. No need to setup SPA route handling on webserver.
- But not SEO friendly.

#### `history`
- Handle page navigation using proper `/page-url` route, like backend based web app. 
- But, the **web server must route all the traffic to same `index.html` file**
	- Check: `/tooling/docker-files/default.conf` for sample implementation of NGINX SPA routing
	- On Netlify deployment, routing is taken care by `_redirects` file. Which is a Netlify config file.
	- To avoid unexpected non-content file (like `_sidebar.md`,`index.hmtl`) from being loaded by netlify markdown fetcher, custom Docsify plugin is implemented to show custom 404 page if those file (with keyword below) is loaded.
		- Add this keyword to any non-content file `<!-- @@@NOCONTENT -->`
- History route is more SEO friendly, so more favorable in production.

#### Note on Router Mode
This project implementation auto detect which mode to use, if url: 
- contains `/#/`, or
- contains `hash=1`/`hash=true`
It will use `hash` routing. Else, by default will use `history` route mode.

- Each route mode can break some asset path, for example when browser open `localhost/en/page-abc/` relative asset path might become `localhost/en/page-abc/asset/...` instead of proper `/asset/...`
	- To handle this, some workaround/hacks are used, like:
		- `/asset/absolute-to-relative.js` script, custom docsify plugins, etc.
		- For now most of it works, but **there might be unexpected asset path invalid issues**.

#### Note on domain migration which replace docs.midtrans.com contents
- To preserve SEO, old docs url paths are 301 redirected to new structure url paths
	- @WARN: the 301 redirect currently just implemented on Netlify `_redirect` file, which doesn't cover if the site is hosted on non-netlify hosting. 
	- Might need to replicate the 301 redirect on Nginx config files as well.

</article>
</details>
