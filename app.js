const express = require("express");
const app = express();
const path = require("node:path");
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

const categoryRouter = require("./routes/CategoryRouter");
app.use("/", categoryRouter);

const itemRouter = require("./routes/ItemRouter");
app.use("/", itemRouter);

app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log("Listening on port:", PORT);
})