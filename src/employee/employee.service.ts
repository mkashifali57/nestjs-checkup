import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Employee } from './employee.model';
import { Model } from 'mongoose';


@Injectable()
export class EmployeeService {
  private employee: Employee[] = [];

  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) { }

  async addEmploye(name: string, age: number) {

    const newEmploye = new this.employeeModel({
      name: name,
      age: age,
    })
    const result = await newEmploye.save();
    console.log(result);
    return result;
  }

  async getEmployee() {
    console.log(`getEmployee`);
    const employee = await this.employeeModel.find().exec();
    return employee.map(prod => ({
      id: prod.id,
      name: prod.name,
      age: prod.age,
    }));
  }

  getSingleEmploye(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateEmploye(productId: string, name: string, age: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (name) {
      updatedProduct.name = name;
    }

    if (age) {
      updatedProduct.age = age;
    }
    //  this.products[index] = updatedProduct;
  }

  deleteEmploye(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.employee.splice(index, 1);
  }

  private findProduct(id: string): [Employee, number] {
    const productIndex = this.employee.findIndex(prod => prod.id === id);
    const product = this.employee[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
