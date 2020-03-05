/**
 * @description schema 校验
 */

const AJV = require('ajv')
const ajv = new AJV()

function validateSchema(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validateSchema