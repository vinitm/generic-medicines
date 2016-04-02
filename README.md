# Generic-medicines

A website to suggest cheaper alternatives to costly branded medicine.

## Getting Started

### Download / Clone

Clone the repo using Git:

```bash
 git clone https://github.com/vinitm/generic-medicines.git
```
Windows users, if you have trouble compiling due to line endings then make sure
you configure git to checkout the repository with `lf` (unix) line endings. This
can be achieved by setting `core.eol`.

```
git config core.eol lf
git config core.autocrlf input
git rm --cached -r .
git reset --hard
```
### Initialize

Download all the necessary npm modules:
```
npm install
```
### Build and Run

To run the node server locally, build the client files and launch the site in browser, run:
```
gulp
```
