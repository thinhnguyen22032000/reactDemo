var express = require('express');

var bodyparser = require('body-parser');

var parser = bodyparser.urlencoded({ extended: false })



var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.set("views", "./views");

app.listen(3000);

var mang = ["thinh", "IT"];
app.get("/", function(req, res){
	res.render("trangchu");
})
app.post("/setNotes", function(req, res) {
	res.send(mang);
} )

app.post("/add", parser, function(req, res) {
	var newNote  = req.body.note;
	mang.push(newNote);
	res.send(mang);
} )

app.post("/delete", parser, function(req, res) {
	var idXoa  = req.body.idXoa;
	mang.splice(idXoa, 1);
	res.send(mang);
} )

app.post("/update", parser, function(req, res) {
	var id  = req.body.idEdit;
	mang[id] = req.body.noiDung;
	res.send(mang);
} )


