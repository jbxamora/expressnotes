# Note Taker

Note Taker is a simple web application for creating, storing, and managing notes. Built with Express and Node.js, it allows users to quickly write down and save their thoughts and ideas.
## User Story

```md
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```md
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column,
 plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Installation

To install and run Note Taker on your local machine, follow these steps:

- Clone this repository to your local machine
- Install the necessary dependencies with npm install
- Start the server with npm start 

**OR**

Visit the deployed application

https://expressnotes.herokuapp.com/


![Picture of Deployed App](./assets/Screen%20Shot%202023-02-20%20at%204.25.13%20PM.png)

## Code Snippets

### MIME types
I encounted many bugs where the css and js files wouldnt be served correctly. Here is the fix in my server file!
```js
app.get("/public/js/index.js", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "public", "js", "index.js"));
});

app.get("/public/css/style.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public", "css", "style.css"));
});

```

### Delete Route

```js
// Route for deleting a note from the database
app.delete('/notes/:id', (req, res) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading database");
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (err) {
            return res.status(500).send("Error parsing database");
        }
        // Filter notes to keep those with ID other than one to be deleted
        const id = req.params.id;
        const notesToKeep = db.filter((note) => note.id != id);
        // If the length of notesToKeep is equal to original notes, it means the note to delete was not found and will display that error
        if (notesToKeep.length === db.length) {
            return res.status(404).send("Note not found");
        }
        // Writing the filtered notes back to databse file
        fs.writeFile(dbPath, JSON.stringify(notesToKeep), (err) => {
            if (err) {
                return res.status(500).send("Error writing database");
            }
            res.json(notesToKeep);
        });
    });
});

```

## License

MIT License

Copyright (c) [2022] [Jorge Zamora]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

<a href=”https://www.linkedin.com/in/jorge-zamora-786945250/”>
<img src='https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue'>

![badmath](https://img.shields.io/github/followers/jbxamora?label=JBXAMORA&logoColor=%23fd2423&style=social)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. If the issue goes unresolved for more than a week feel free to contact me at any of the links listed below. Be sure to add me on LinkedIn and Follow me on GitHub to view my course progression. You can also visit the deployed site and sent a messafe through the contact form.

[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/jbxamora) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' alt='linkedin' height='40'>](https://www.linkedin.com/in/jorge-zamora-786945250//) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg' alt='instagram' height='40'>](https://www.instagram.com/jbxamora/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg' alt='stackoverflow' height='40'>](https://stackoverflow.com/users/20023706/jbxamora)
