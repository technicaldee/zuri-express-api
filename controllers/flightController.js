let flights = require('../flights.json')
const fs = require('fs')

 function all (req, res) {
    res.json(flights)
}

 function post (req, res) {
    flights.push(req.body)

    let stringedData = JSON.stringify(flights, null, 2)
    fs.writeFile('../flights.json', stringedData, function(err){
        if(err){
            return res.status(500).json({message: err})
        }
    })
    res.json({message: "New Flight Added"})
}

 function single (req, res) {
    let id = req.params.id;
    let foundFlight = flights.find(flight => {
        return String(flight.id) === id
    })

    if(foundFlight){
        return res.status(200).json({flight: foundFlight})
    } else {
        return res.status(404).json({message: "flight not found"})
    }
}

 function update (req, res) {
    let id = req.params.id;
    let flightIndex = flights.findIndex((flight => flight.id == id));

    flights[flightIndex] = req.body

    let stringedData = JSON.stringify(flights, null, 2)
    fs.writeFile('../flights.json', stringedData, function(err){
        if(err){
            return res.status(500).json({message: err})
        }
    })
    res.json({message: "Flight with id: "+id+" Added"})
}

 function deleteFlight (req, res) {
    let id = req.params.id;

    var index = flights.findIndex(function(o){
        return o.id === id;
   })

 flights.splice(index, 1)

   console.log(flights)

    let stringedData = JSON.stringify(flights, null, 2)
    fs.writeFile('../flights.json', stringedData, function(err){
        if(err){
            return res.status(500).json({message: err})
        }
    })
    res.json({message: "Flight with id: "+id+" Deleted"})
}

exports.all = all
exports.post = post
exports.single = single
exports.update = update
exports.deleteFlight = deleteFlight