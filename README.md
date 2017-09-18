# Better Canvas

Better Canvas is an extension for Google Chrome that adds various improvements to the ECPI University version of [Instructure Canvas](https://github.com/instructure/canvas-lms). This was made throughout several terms at ECPI, whenever I had free time.

### Disclaimer
This application accesses the Canvas API through a user's personal access token, which 
[is meant to be only used for testing purposes](https://canvas.instructure.com/doc/api/file.oauth.html#manual-token-generation). As a result, this application is not meant to be downloaded and installed until I can aquire a developer key and implement OAuth.

## Features

* Shortcut links in the sidebar to all starred courses
* A "jump to top" button on most pages
* Tracking of all data using the Canvas API [custom data storage](https://canvas.instructure.com/doc/api/users.html#method.custom_data.set_data) to store it with your Canvas user account

### Module View
* Checkboxes on every module item
* Option to hide any ungraded module item, with entire modules becoming hidden when they contain no items
* A table of contents, listing each module and the percentage of items checked off
* Ability to jump to a module by clicking its TOC item

### Simple extension popup w/ options
* Toggle the viewing of hidden module items
* Jump to the first unchecked item
* Mark or highlight unchecked items
* Hide checked items

### Grades View
* Checkboxes on each assignment
* General fixes for grade table styling

### Quiz View
* Expanded question list in sidebar, removing the need to scroll the list
