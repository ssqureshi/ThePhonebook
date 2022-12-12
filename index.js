const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const generateId = () => {
        min = Math.ceil(1);
        max = Math.floor(99999);
        return Math.floor(Math.random() * (max - min) + min)
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'Name and number missing'      
    })
    }
    else if (persons.some(x => x.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} is already added to phonebook`
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    morgan.token('content', function getContent (req) { 
        req.content = JSON.stringify(body)
        return req.content
    })
    
    persons = persons.concat(person)
    response.json(person)
  })

 
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
