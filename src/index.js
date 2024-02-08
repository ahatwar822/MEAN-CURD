// Import necessary modules

express = require('express');
app = express();
port = 3000;

// Import the Mongoose model for 'Student' from 'database.js'
Student = require('./database.js');

// Set up Express and MongoDB
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route: Fetch all students and render the index page
app.get('/', async(req, res) => {
    students = await Student.find();
    res.render('index.ejs', {
        page: "Crud with express and mongoose",
        title : "Read and Delete Oprations",
        students:students})
});

// Register Route: Add a new student and redirect to the home page
app.post('/register', async(req ,res) =>{
    const{name,mail, age} = req.body;
    newstudent = new Student({
        name,mail,age
    });
    studentsave =await newstudent.save();
    res.redirect('/');
});

// Render the registration form
app.get("/register", (req, res) => {
    res.render('register.ejs')
});

// Delete Route: Delete a student by ID and redirect to the home page
app.get('/delete/:id', async(req, res) => {
    const {id} = req.params;
    deleteStudent = await Student.findByIdAndDelete({_id:id});
    res.redirect('/');
});


// Edit Routes: Render the edit form or update a student and redirect to the home page
app.get('/edit/:id', async(req, res) => {
    const {id} = req.params;
    editStudent = await Student.findById({_id:id});
    if (editStudent == null){res.redirect('/')}
    else{res.render('edit.ejs', {
        students:editStudent
    })}
    res.render('edit.ejs')
});

app.post('/edit/:id', async(req, res) => {
    const {id} = req.params;
    const {name,mail,age} = req.body;
    editStudent = await Student.findByIdAndUpdate({_id:id},
    {name,mail,age}, {new:true});
    res.redirect('/');
});