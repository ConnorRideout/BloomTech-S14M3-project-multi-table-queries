const db = require('../../data/db-config')
function find() {
    /*
    SELECT
        sc.*,
        count(st.step_id) as number_of_steps
    FROM schemes as sc
    LEFT JOIN steps as st
        ON sc.scheme_id = st.scheme_id
    GROUP BY sc.scheme_id
    ORDER BY sc.scheme_id ASC;
    */
    return db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('sc.*')
        .count('st.step_id as number_of_steps')
        .groupBy('sc.scheme_id')
        .orderBy('sc.scheme_id', 'asc')
}

function findById(scheme_id) {
    /*
    SELECT
        sc.scheme_name,
        st.*
    FROM schemes as sc
    LEFT JOIN steps as st
        ON sc.scheme_id = st.scheme_id
    WHERE sc.scheme_id = 1
    ORDER BY st.step_number ASC;
    */
    scheme_id = parseInt(scheme_id)
    return db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('sc.scheme_name', 'st.*')
        .where('sc.scheme_id', scheme_id)
        .orderBy('st.step_number', 'asc')
        .then(resArr => {
            return db('schemes')
                .select('scheme_name')
                .where('scheme_id', scheme_id)
                .first()
                .then(scheme_name => {
                    if (scheme_name === undefined) return scheme_name
                    let steps = resArr.filter(step => step.step_id).map(step => {
                        const { step_id, step_number, instructions } = step
                        return { step_id, step_number, instructions }
                    })
                    return { scheme_id, ...scheme_name, steps }
                })
        })
}

function findSteps(scheme_id) {
    scheme_id = parseInt(scheme_id)
    return db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
        .where('sc.scheme_id', scheme_id)
        .orderBy('st.step_number')
        .then(steps => {
            if (steps.length === 1) {
                return steps.filter(st => st.step_id)
            }
            return steps
        })
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(([id]) => {
            return db('schemes')
                .where('scheme_id', id)
                .first()
        })
}

function addStep(scheme_id, step) { // EXERCISE E
    /*
      1E- This function adds a step to the scheme with the given `scheme_id`
      and resolves to _all the steps_ belonging to the given `scheme_id`,
      including the newly created one.
    */
    return db('steps')
        .insert({ ...step, scheme_id })
        .then(() => {
            return findSteps(scheme_id)
        })
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
}
