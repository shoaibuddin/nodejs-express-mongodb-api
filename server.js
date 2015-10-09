// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://USERNAME:PASSWORD@ds039950.mongolab.com:39950/shoaibuddin'); // connect to our database
var Employee     = require('./app/models/employee');
var Students     = require('./app/models/students');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

//=============================================================================
// on routes that end in /employee
// ----------------------------------------------------
router.route('/employee')

	// create a employee (accessed at POST http://localhost:8080/employee)
	.post(function(req, res) {
		
		var employee = new Employee();		// create a new instance of the Employee model
		employee.name = req.body.name;  // set the employee name (comes from the request)

		employee.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Employee created!' });
		});

		
	})

	// get all the employee (accessed at GET http://localhost:8080/api/employee)
	.get(function(req, res) {
		Employee.find(function(err, employee) {
			if (err)
				res.send(err);

			res.json(employee);
		});
	});

// on routes that end in /employee/:employee_id
// ----------------------------------------------------
router.route('/employee/:employee_id')

	// get the employee with that id
	.get(function(req, res) {
		Employee.findById(req.params.employee_id, function(err, employee) {
			if (err)
				res.send(err);
			res.json(employee);
		});
	})

	// update the employee with this id
	.put(function(req, res) {
		Employee.findById(req.params.employee_id, function(err, employee) {

			if (err)
				res.send(err);

			employee.name = req.body.name;
			employee.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Employee updated!' });
			});

		});
	})

	// delete the employee with this id
	.delete(function(req, res) {
		Employee.remove({
			_id: req.params.employee_id
		}, function(err, employee) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

//=============================================================================
// on routes that end in /students
// ----------------------------------------------------
router.route('/students')

	// create a students (accessed at POST http://localhost:8080/students)
	.post(function(req, res) {
		
		var students = new Students();		// create a new instance of the Students model
		students.name = req.body.name;  // set the students name (comes from the request)

		students.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Students created!' });
		});

		
	})

	// get all the students (accessed at GET http://localhost:8080/api/students)
	.get(function(req, res) {
		Students.find(function(err, students) {
			if (err)
				res.send(err);

			res.json(students);
		});
	});

// on routes that end in /students/:students_id
// ----------------------------------------------------
router.route('/students/:students_id')

	// get the students with that id
	.get(function(req, res) {
		Students.findById(req.params.students_id, function(err, students) {
			if (err)
				res.send(err);
			res.json(students);
		});
	})

	// update the students with this id
	.put(function(req, res) {
		Students.findById(req.params.students_id, function(err, students) {

			if (err)
				res.send(err);

			students.name = req.body.name;
			students.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Students updated!' });
			});

		});
	})

	// delete the students with this id
	.delete(function(req, res) {
		Students.remove({
			_id: req.params.students_id
		}, function(err, students) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
