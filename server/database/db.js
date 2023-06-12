const { Pool } = require('pg');

const pool = new Pool();
pool.database = 'theworld';

module.exports = pool;
