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
}
