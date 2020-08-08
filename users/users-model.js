const db = require('../database/connection.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
    return db('users').select('username', 'department');
  }

function findById(id){
    return db('users').where({ id }).first();
  }

function findBy(filter) {
  return db('users').where(filter).orderBy('id');
}

async function add(user) {
    try{
      const [id] = await db('users').insert(user,'id');

      return findById(id);
    } catch (error) {
      throw error;
    }
  }
