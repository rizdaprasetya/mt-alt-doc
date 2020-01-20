# Instruction

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
	- Preview using Githack: https://raw.githack.com/rizdaprasetya/mt-alt-doc/master/
	- Change `master` with any branch you want to preview
	- Note: Githack is free service so it might not be always available

## Structure

- Documentation content are located at `en` (english) & `id` (indonesia) folder. i.e: `/en/snap/overview.md`.
- Subfolder are grouped in accordance with how it listed in Sidebar Menu. i.e: snap, midtrans_account, etc.
- Docs content are in markdown format.
- Docs content can contain html tags, but please use markdown as much as possible, to minimize custom html tags.
- This project are using [Docsify](https://docsify.js.org/).
- `index.html` contains all the Docsify script, plugins, and config.
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

### [Card Title With Link (optional) &#187;](https://example.com)
Optional card body content, or actually you can use any html/markdown content within card.
</div>
```

## Deploying

- Just pull request or commit to `master` branch.
- Commit pushed to `master` branch are auto-deployed to https://mt-alt-doc.netlify.com .