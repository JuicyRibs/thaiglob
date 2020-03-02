exports.getIndex = (req, res) =>
  res.render("index", {
    title: "ThaiGlob"
  });

exports.getNews = (req, res) =>
  res.render("news", {
    title: "ThaiGlob - News"
  });

exports.getArticles = (req, res) =>
  res.render("articles", {
    title: "ThaiGlob - Articles"
  });

exports.getEvents = (req, res) =>
  res.render("events", {
    title: "ThaiGlob - Events"
  });

exports.getBooks = (req, res) =>
  res.render("book", {
    title: "ThaiGlob - Publications"
  });

exports.getResearches = (req, res) =>
  res.render("research", {
    title: "ThaiGlob - Researches"
  });

exports.getAbout = (req, res) =>
  res.render("about", {
    title: "ThaiGlob - Who We Are"
  });

exports.getUpdates = (req, res) =>
  res.render("updates", {
    title: "ThaiGlob - Thailand Climate Changes"
  });

exports.getContact = (req, res) =>
  res.render("contact", {
    title: "ThaiGlob - Contact Us"
  });
