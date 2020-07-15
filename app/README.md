# TODO List

10/07/2020

-   [x] Remove `required` tag from admin panel
-   [x] Remove Post cover from `post.ejs` _(Backend only)_ <= Ima not do that. We still need it for other pages.
-   [x] Quill.js Add Angsana New and font size options _No Ansana New. Not legal_
-   [x] Change share button Logo **needs new logo tho**
-   [ ] Quill.js add line spacing
-   [x] related post and tags
-   [x] Research `taget="_blank"`
-   [ ] title `...` if it's too long. String Truncate
-   [x] research **CAN** be blank
-   [x] fix tag something

FRONTEND

-   [x] @JuicyRibs , ADD Every pages
-   [ ] @JuicyRibs , Responsive

BACKEND

-   [x] @ThanadonTee , ADD a todo-list
-   [x] @ThanadonTee , File Upload
-   [x] @ThanadonTee , ~CRUD~
-   [x] @ThanadonTee , Admin Panel
-   [x] @ThanadonTee , Quill.js Custom File handler
-   [x] @ThanadonTee , ~Check if sending big~ found new lead check https://stackoverflow.com/questions/39457257/ejs-include-on-click
-   [x] @ThanadonTee , If above work rewrite some routes
-   [x] @ThanadonTee , ~Implement Article work to others.~ Only Events left, I forgot.
-   [x] @ThanadonTee , Knowledge Center/Index need work.
-   [x] @ThanadonTee , update model with tag and desc
-   [x] @ThanadonTee , update research to current structure
-   [x] @ThanadonTee , fix quilljs
-   [x] @ThanadonTee , copy admin page
-   [x] @ThanadonTee , add dummy data
-   [x] @ThanadonTee , show new data
-   [x] @ThanadonTee , Convert dataTable to fooTable
-   [x] @ThanadonTee , Add ~edit~ and Delete pages
-   [x] @ThanadonTee , Add carosal selector

# File Structure

```
app
├── LICENSE
├── package.json
├── public
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   └── images
│   ├── robot.txt
│   └── views
│       └── includes
├── README.md
├── server
│   ├── auth
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   └── uploads
└── utils
```

# How to Install

```bash
npm install
node server/server.js
```
