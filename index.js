import { LinkedList } from './core/linked_list';
import { Employee } from './entities/employee';
import './style.css';


var modal = document.getElementById('employeeModal');

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const fancyList = new LinkedList();

function renderTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';

    fancyList.getAllEmployees().forEach((employee, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${employee.code}</td>
      <td>${employee.name}</td>
      <td>S/. ${employee.salary.toLocaleString()}</td>
    `;
    });
}

const guardar = (event) => {
    event.preventDefault();
    const name = document.getElementById('nombre').value;
    const salary = parseFloat(document.getElementById('sueldo').value);

    if (name && !isNaN(salary)) {
        const newEmployee = new Employee(name, salary);
        fancyList.addFirst(newEmployee);
        renderTable();
        document.getElementById('nombre').value = '';
        document.getElementById('sueldo').value = '';
    } else {
        console.log('Please enter a valid name and salary.');
    }
};

const eliminar = (event) => {
    event.preventDefault();
    const code = document.getElementById('codigo').value;

    if (code) {
        fancyList.deleteByCode(code);
        renderTable();
        console.log(`Empleado con código ${code} eliminado`);

        document.getElementById('codigo').value = '';
    } else {
        console.log('Please enter a valid code to delete.');
    }
};
const consultar = (event) => {
    event.preventDefault();
    const code = document.getElementById('codigo').value;

    if (code) {
        const employee = fancyList.getByCode(code);
        if (employee) {
            document.getElementById('modalName').textContent = `Name: ${employee.name}`;
            document.getElementById('modalSalary').textContent = `Salary: S/. ${employee.salary.toLocaleString()}`;

            document.getElementById('employeeModal').style.display = "block";
        } else {
            console.log(`Empleado con código ${code} no encontrado`);
        }

        document.getElementById('codigo').value = '';
    } else {
        console.log('Please enter a valid code.');
    }
};

const eliminarPrimero = (event) => {
    event.preventDefault();
    fancyList.removeFirst();
    renderTable();
};

const eliminarUltimo = (event) => {
    event.preventDefault();
    fancyList.removeLast();
    renderTable();
};

const actualizar = (event) => {
    event.preventDefault();
    const code = document.getElementById('codigo').value;
    const name = document.getElementById('nombre').value;
    const salary = parseFloat(document.getElementById('sueldo').value);
    if (code && name && !isNaN(salary)) {
        const editedEmployee = new Employee(name, salary, code);
        fancyList.updateEmployee(code, editedEmployee);
        renderTable();
        document.getElementById('codigo').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('sueldo').value = '';
    } else {
        console.log('Please enter a valid code, name, and salary to update.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fancyList.addFirst(new Employee('Rodrigo Alva', 900));
    fancyList.addFirst(new Employee('Damaris Del Carpio', 900));
    fancyList.addFirst(new Employee('Ruth Rojas', 1200));
    document.getElementById('guardarBtn').addEventListener('click', guardar);
    document.getElementById('eliminarBtn').addEventListener('click', eliminar);
    document.getElementById('eliminarFirstBtn').addEventListener('click', eliminarPrimero);
    document.getElementById('eliminarLastBtn').addEventListener('click', eliminarUltimo);
    document.getElementById('consultarBtn').addEventListener('click', consultar);
    document.getElementById('actualizarBtn').addEventListener('click', actualizar);
    renderTable();
});

