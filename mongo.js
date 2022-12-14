/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]


const url = `mongodb+srv://fullstackopen:${password}@cluster0.rl4t8wy.mongodb.net/?retryWrites=true&w=majority`

const personschema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personschema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    // eslint-disable-next-line no-undef
    if (process.argv.length === 3) {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }
    else {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })
      person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
    }

  })