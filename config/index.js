// NOTE : process.env.NODE_ENV != argv.env
// process.env.NODE_ENV : Differentiate dev environnement to other 'on server' deployed environnement
// argv.env : Used to bind to real environnments (pre prod, staging, production)
if (!process.env.NODE_ENV) {
  throw new Error('Can\'t build files without env context. Please set NODE_ENV env variable');
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
  throw new Error('"env_context" must be either production, development');
}

module.exports = {
  [process.env.NODE_ENV]: require(`./${process.env.NODE_ENV}.env.js`),
}
