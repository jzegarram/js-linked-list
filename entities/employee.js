export class Employee {
    constructor(name, salary, code) {
      this.name = name;
      this.salary = salary;
      this.code = code ?? Employee.generateCode();
    }

    static generateCode() {
      return 'EMP' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }
  }