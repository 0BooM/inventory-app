const db = require("../db/itemQueries");

async function getItemDetails(req, res) {
    const id = req.params.id;
    try{
        const item = await db.getItem(id);
        if(!item){
            res.status(404).send("Item not found!");
        }
        res.render("item", {item});
    } catch (err){
        res.status(500).send("Error fetching category or items");
    }
}

module.exports = {
    getItemDetails,
}