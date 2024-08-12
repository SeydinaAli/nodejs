const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let taches = [];

// Créer une tâche
app.post('/taches', (req, res) => {
    const tache = { id: taches.length + 1, ...req.body };
    taches.push(tache);
    res.status(201).send(tache);
});

// Lister toutes les tâches
app.get('/taches', (req, res) => {
    res.send(taches);
});

// Modifier une tâche
app.put('/taches/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = taches.findIndex(t => t.id === id);

    if (index !== -1) {
        taches[index] = { id, ...req.body };
        res.send(taches[index]);
    } else {
        res.status(404).send({ message: "Tâche non trouvée" });
    }
});

// Supprimer une tâche
app.delete('/taches/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = taches.findIndex(t => t.id === id);

    if (index !== -1) {
      taches.splice(index, 1);
      res.status(204).send();
  } else {
      res.status(404).send({ message: "Tâche non trouvée" });
  }
});

app.listen(port, () => {
  console.log(Serveur en écoute sur le port ${port});
});

