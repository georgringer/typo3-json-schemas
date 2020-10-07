const expect = require('chai').expect
const Ajv = require('ajv')
const yaml = require('js-yaml')
const fs = require('fs')

const schema = require('../siteconfig.json')

const validate = (name) => {
    const pipeline = yaml.safeLoad(fs.readFileSync(`./fixtures/${name}`, 'utf8'))

    const ajv = new Ajv({ allErrors: true })
    var validate = ajv.compile(schema)

    var valid = validate(pipeline)
    if (!valid) {
        expect(ajv.errorsText(validate.errors)).to.eql(undefined)
    }
}

describe('schema.json', function() {
    it('should validate all', function() {
        validate('example1.yaml')
    })
})
