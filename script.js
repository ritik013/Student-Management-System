
// Initial array of students
const students = [];
  
  const studentForm = document.getElementById('studentForm');
  const addStudentBtn = document.getElementById('addStudentBtn');
  const searchInput = document.getElementById('searchInput');
  const studentTable = document.getElementById('studentTable');
  
  // Function to render the student table
  function renderStudentTable() {
    studentTable.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Grade</th>
        <th>Degree</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    `;
  
    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td><button class="editBtn" data-id="${student.ID}">Edit</button></td>
        <td><button class="deleteBtn" data-id="${student.ID}">Delete</button></td>
      `;
      studentTable.appendChild(row);
    });
  }
  
  // Function to add a new student
  function addStudent(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const gradeInput = document.getElementById('grade');
    const degreeInput = document.getElementById('degree');
    const emailInput = document.getElementById('email');
  
    // Get the values from the input fields
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value;
    const degree = degreeInput.value;
    const email = emailInput.value;
  
    // Create a new student object
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };
  
    // Add the new student to the students array
    students.push(newStudent);
  
    // Clear the input fields
    nameInput.value = '';
    ageInput.value = '';
    gradeInput.value = '';
    degreeInput.value = '';
    emailInput.value = '';
  
    // Render the updated student table
    renderStudentTable();
  }
  
  // Function to handle edit student
  function editStudent(event) {
    const target = event.target;
  
    if (target.classList.contains('editBtn')) {
      const studentID = parseInt(target.getAttribute('data-id'));
  
      // Find the student with the matching ID
      const student = students.find((student) => student.ID === studentID);
  
      if (student) {
        // Fill the form fields with the student's data
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const gradeInput = document.getElementById('grade');
        const degreeInput = document.getElementById('degree');
        const emailInput = document.getElementById('email');
  
        nameInput.value = student.name;
        ageInput.value = student.age;
        gradeInput.value = student.grade;
        degreeInput.value = student.degree;
        emailInput.value = student.email;
  
        // Change the button text to "Edit Student"
        addStudentBtn.textContent = 'Edit Student';
  
        // Remove the existing event listener from the button
        addStudentBtn.removeEventListener('click', addStudent);
  
        // Add a new event listener for editing the student
        addStudentBtn.addEventListener('click', function (event) {
          event.preventDefault();
  
          // Update the student's data
          student.name = nameInput.value;
          student.age = parseInt(ageInput.value);
          student.grade = gradeInput.value;
          student.degree = degreeInput.value;
          student.email = emailInput.value;
  
          // Clear the form fields
          nameInput.value = '';
          ageInput.value = '';
          gradeInput.value = '';
          degreeInput.value = '';
          emailInput.value = '';
  
          // Change the button text back to "Add Student"
          addStudentBtn.textContent = 'Add Student';
  
          // Remove the event listener for editing the student
          addStudentBtn.removeEventListener('click', editStudent);
  
          // Add back the event listener for adding a new student
          addStudentBtn.addEventListener('click', addStudent);
  
          // Render the updated student table
          renderStudentTable();
        });
      }
    }
  }
  
  // Function to delete a student
  function deleteStudent(event) {
    const target = event.target;
  
    if (target.classList.contains('deleteBtn')) {
      const studentID = parseInt(target.getAttribute('data-id'));
  
      // Find the index of the student with the matching ID
      const index = students.findIndex((student) => student.ID === studentID);
  
      if (index !== -1) {
        // Remove the student from the students array
        students.splice(index, 1);
  
        // Render the updated student table
        renderStudentTable();
      }
    }
  }
  
  // Function to filter students based on search input
  function searchStudents() {
    const searchValue = searchInput.value.toLowerCase();
  
    // Filter the students array based on name, email, or degree
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue) ||
      student.degree.toLowerCase().includes(searchValue)
    );
  
    // Render the filtered student table
    renderFilteredStudentTable(filteredStudents);
  }
  
  // Function to render the filtered student table
  function renderFilteredStudentTable(filteredStudents) {
    studentTable.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Grade</th>
        <th>Degree</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    `;
  
    filteredStudents.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td><button class="editBtn" data-id="${student.ID}">Edit</button></td>
        <td><button class="deleteBtn" data-id="${student.ID}">Delete</button></td>
      `;
      studentTable.appendChild(row);
    });
  }
  
  // Render the initial student table
  renderStudentTable();
  
  // Add event listeners
  addStudentBtn.addEventListener('click', addStudent);
studentTable.addEventListener('click', editStudent);
studentTable.addEventListener('click', deleteStudent);
searchInput.addEventListener('input', searchStudents);
  