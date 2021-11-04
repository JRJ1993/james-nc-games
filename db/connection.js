const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.PGDATABASE_URL) {
  throw new Error('PGDATABASE not set');
}

const config = ENV === 'production' ? {
  conectionString:process.env.DATABASE_URL, ssl: {
    rejectUnauthorized:false
  },
}
:{};

module.exports = new Pool(config);
