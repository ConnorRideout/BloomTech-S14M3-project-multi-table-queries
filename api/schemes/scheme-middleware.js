const Schemes = require('./scheme-model.js')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
    const { scheme_id: id } = req.params
    Schemes.findById(id)
        .then(sch => {
            if (sch) {
                next()
            } else {
                res.status(404).json({ message: `scheme with scheme_id ${id} not found` })
            }
        })
        .catch(next)
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
    const { scheme_name: name } = req.body
    if (!name || typeof name !== 'string' || !name.trim()) {
        res.status(400).json({ message: "invalid scheme_name" })
    } else {
        next()
    }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
    const { instructions, step_number } = req.body
    if (
        (!instructions || typeof instructions !== 'string' || !instructions.trim()) ||
        (typeof step_number !== 'number' || step_number < 1)
    ) {
        res.status(400).json({ message: "invalid step" })
    } else {
        next()
    }
}

module.exports = {
    checkSchemeId,
    validateScheme,
    validateStep,
}
