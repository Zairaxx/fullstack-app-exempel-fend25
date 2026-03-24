const url = "http://localhost:3000/students"

const studentList = document.getElementById("studentList")
const addBtn = document.getElementById("addStudent")
const sortBtn = document.getElementById("sortStudents")
const toggleBtn = document.getElementById("toggleView")
const modal = document.getElementById("editModal")
const saveEdit = document.getElementById("saveEdit")
const closeModal = document.getElementById("closeModal")

let currentStudentId = null
let cardView = true
let students = []

// Hämta elever
async function getStudents() {

    //GET-request - Hämta ut alla elever och ange de som argument i renderStudents.
    //Använd dig av existerande sparad url.

    renderStudents(students)
}

getStudents()

// Visa elever
function renderStudents(data) {

    studentList.innerHTML = ""

    data.forEach(student => {

        studentList.innerHTML += `

<div class="student-card">

<h3>${student.firstName} ${student.lastName}</h3>

<p>Ålder: ${student.age}</p>
<p>${student.email}</p>

<div class="card-buttons">

<button class="edit" onclick="editStudent('${student.id}')">Redigera</button>
<button class="delete" onclick="deleteStudent('${student.id}')">Ta bort</button>

</div>

</div>

`

    })

}

// Lägg till elev
addBtn.addEventListener("click", async () => {

    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const age = document.getElementById("age").value

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ankademin.se`

    const student = {
        firstName,
        lastName,
        age,
        email
    }

    //LÄGG TILL POST-REQUEST
    //Variabler att använda: url, student

    getStudents()

})

// Ta bort elev
async function deleteStudent(id) {

    //LÄGG TILL DELETE-REQUEST
    //Variabler att använda: url, id

    getStudents()

}

// Redigera elev
function editStudent(id) {

    const student = students.find(s => String(s.id) === String(id))

    currentStudentId = id

    document.getElementById("editFirstName").value = student.firstName
    document.getElementById("editLastName").value = student.lastName
    document.getElementById("editAge").value = student.age

    modal.style.display = "flex"

}

// Sortera
sortBtn.addEventListener("click", () => {

    const sorted = [...students].sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
    )

    renderStudents(sorted)

})

toggleBtn.addEventListener("click", () => {

    cardView = !cardView

    if (cardView) {

        studentList.classList.remove("student-list")
        studentList.classList.add("student-grid")

        toggleBtn.textContent = "Listvy"

    } else {

        studentList.classList.remove("student-grid")
        studentList.classList.add("student-list")

        toggleBtn.textContent = "Kortvy"

    }

})

closeModal.addEventListener("click", () => {
    modal.style.display = "none"
})

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none"
    }
})

saveEdit.addEventListener("click", async () => {
    if (!currentStudentId) {
        console.error("Ingen student vald att spara")
        return
    }

    const firstName = document.getElementById("editFirstName").value.trim()
    const lastName = document.getElementById("editLastName").value.trim()
    const age = document.getElementById("editAge").value.trim()

    if (!firstName || !lastName || !age) {
        alert("Vänligen fyll i alla fält innan du sparar")
        return
    }

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ankademin.se`

    const updatedStudent = {
        id: currentStudentId,
        firstName,
        lastName,
        age,
        email
    }

    try {

        //LÄGG TILL PUT-REQUEST
        //Variabler att använda: url, currentStudentId, updatedStudent

        modal.style.display = "none"
        currentStudentId = null
        await getStudents()

    } catch (err) {
        console.error(err)
        alert("Kunde inte spara ändringar. Se konsolen för detaljer.")
    }
})