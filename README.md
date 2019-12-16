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

## Deploying

- Just pull request or commit to `master` branch.
- Commit pushed to `master` branch are auto-deployed to https://mt-alt-doc.netlify.com .