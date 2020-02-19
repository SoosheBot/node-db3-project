const db = require("../data/db.Config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

function find() {
  return db("schemes");
};

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
};

function findSteps(id) {
  // what it looks like in sqlite3
  // select [s].id, [s].step_number, [s].instructions, [s].scheme_id
  // from steps as s
  // join schemes as sc
  // on [s].scheme_id = [sc].id
  // where [sc].id = [s].scheme_id;
  return db("steps as s")
    .select(
      "s.id as step_id",
      "s.step_number as step number",
      "s.instructions as instructions",
      "sc.id as scheme_id"
    )
    .join("schemes as sc", "s.scheme_id", "=", "sc.id")
    .where("scheme_id", id);
};

function add(scheme) {
    return db("schemes")
    .first()
    .insert(scheme);
};

function addStep(step, scheme_id) {
    return db("steps as s")
    .select("sc.id as scheme_id",
    "s.step_number as step_number",
    "s.instructions as instructions"
    )
    .insert(step)
    .join("steps as s", 
    "s.step_number", 
    "s.instructions",
    "sc.id", "=", "s.scheme_id" )
    .where("scheme_id", scheme_id)
    .then(count => findById(id));
};

function update(changes, id) {
    return db("schemes", "id")
    .where({ id })
    .update(changes, "*")
    .then(count => findById(id));
};

function remove(id) {
    return db("schemes")
    .where({ id })
    .del();
};
