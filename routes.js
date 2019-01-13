module.exports = (app) => {

  const Datastore = require('@google-cloud/datastore');
  const datastore = new Datastore({});

  app.get('/', async function(req, res) {
    const query = datastore.createQuery('trash-site');
    query.run(function(err, entities, info) {
      // entities = An array of records.
      res.status(200).send(entities);
    });
  });

  app.get('/show-clean', async function(req, res) {
    const query = datastore.createQuery('trash-site').filter('clean', '=', true);
    query.run(function(err, entities, info) {
      // entities = An array of records.
      res.status(200).send(entities);
    });
  });

  app.get('/show-dirty', async function(req, res) {
    const query = datastore.createQuery('trash-site').filter('clean', '=', false);
    query.run(function(err, entities, info) {
      // entities = An array of records.
      res.status(200).send(entities);
    });
  });

  app.get('/clean-site', async function(req, res) {
    console.log(req.params);
    var lat = parseInt(req.params.latitude);
    var lon = parseInt(req.params.longitude);
    const query = datastore.createQuery('trash-site').filter('latitude', '=', lat).filter('longitude', '=', lon);
    query.run(async function(err, entities, info) {
      entities.forEach(async function(entity) {
        entity['clean'] = true;
        await datastore.update(entity);
      });
    });
    res.status(200).send();
  });
}
