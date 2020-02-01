const admin = require("firebase-admin");

const db = admin.firestore().collection("products");

module.exports = {
  async getData(req, res) {
    products = [];
    const response = await (await db.get()).docs;
    response.forEach(element => {
      const obj = { _id: element.id };
      const aux = Object.assign({}, element.data(), obj);
      products.push(aux);
    });
    res.send(products);
  },
  addData(req, res) {
    const newProduct = {
      name: req.body.name,
      url: req.body.url,
      type: req.body.type
    };
    db.add(newProduct).then(function() {
      res.send("Adicionado com sucesso");
    });
  },
  async updateData(req, res) {
    const response = await (await db.get()).docs;
    response.forEach(async element => {
      if (element.id === req.params.id) {
        const newProduct = {
          name: req.body.name || element.data().name,
          url: req.body.url || element.data().url,
          type: req.body.type || element.data().type
        };
        db.doc(req.params.id)
          .update(newProduct)
          .then(function() {
            res.send("Atualizado com sucesso");
          });
      }
    });
  },
  async deleteData(req, res) {
    const product = await db.doc(req.params.id).delete();
    res.send("Excluido com sucesso");
  },
  async deleteAll(req, res) {
    const response = await (await db.get()).docs;
    response.forEach(async element => {
      await db.doc(element.id).delete();
    });
    res.send("Todos os dados foram apagados");
  }
};
