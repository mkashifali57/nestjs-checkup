import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Slot } from './slot.model';
import { Model } from 'mongoose';


@Injectable()
export class SlotService {
  private employee: Slot[] = [];

  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Slot>) { }

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
    return employee.map((slot: Slot) => ({
      id: slot.id,
      venueId: slot.venueId,
      employeeId: slot.employeeId,
      date: slot.scheduledAt,
      status: slot.status,
      note: slot.note,
    }));
  }

  getSingleEmploye(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateEmploye(productId: string, name: string, age: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    // if (name) {
    //   updatedProduct.name = name;
    // }

    // if (age) {
    //   updatedProduct.age = age;
    // }
    //  this.products[index] = updatedProduct;
  }

  deleteEmploye(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.employee.splice(index, 1);
  }

  private findProduct(id: string): [Slot, number] {
    const productIndex = this.employee.findIndex(prod => prod.id === id);
    const product = this.employee[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
