import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Employee } from './employee.model';
import { Model } from 'mongoose';


@Injectable()
export class EmployeeService {
  private employee: Employee[] = [];

  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) { }

  async addEmploye(name: string, age: number) {
    try {
      const newEmploye = new this.employeeModel({
        name: name,
        age: age,
      })
      const result = await newEmploye.save();
      return result;
    } catch (err) { return err }

  }

  async getEmployee(): Promise<Employee[]> {
    try {
      const employee = await this.employeeModel.find().exec();
      return employee
    }
    catch (err) {
      console.log(err);
      return err
    }
  }



  async updateEmploye(employeId: string, name: string, age: number) {
    try {
      const updatedEmploye = await this.employeeModel.findByIdAndUpdate(employeId, { name, age }, { new: true }).exec();
      return updatedEmploye
    } catch (err) {
      return err
    }
  }

  async deleteEmploye(employeId: string) {
    try {
      const deletedEmployee = await this.employeeModel.findByIdAndDelete(employeId);
      if (!deletedEmployee)
        throw new NotFoundException('Employe not found')
      return deletedEmployee
    } catch (err) {
      console.error(err);
      return err
    }
  }

  async getSingleEmploye(id: string): Promise<Employee> {
    try {
      const employe = await this.employeeModel.findById(id);
      if (!employe) {
        throw new NotFoundException('Could not find employee.');
      }
      return employe;
    } catch (e) {
      return e
    }
  }
}
