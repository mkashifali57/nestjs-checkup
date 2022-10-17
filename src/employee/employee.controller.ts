import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Employee } from './employee.model';

import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly productsService: EmployeeService) { }

  @Post()
  async addEmploye(
    @Body('name') name: string,
    @Body('age') age: number,
  ) {
    try {

      const employee = await this.productsService.addEmploye(
        name,
        age,
      );
      return { employee };
    } catch (err) {
      console.log(err);
      return err
    }
  }

  @Get()
  async getAllEmployee() {
    try {
      const employee = await this.productsService.getEmployee();
      return employee as Employee[]
    } catch (err) {
      console.log(err);
      return err
    }
  }

  @Get(':id')
  getEmploye(@Param('id') empId: string) {
    return this.productsService.getSingleEmploye(empId);
  }

  @Patch(':id')
  async updateEmploye(
    @Param('id') empId: string,
    @Body('name') name: string,
    @Body('age') age: number,
  ) {
    try {

      const updatedEmploye = await this.productsService.updateEmploye(empId, name, age);
      return updatedEmploye;
    } catch (err) {
      return err
    }
  }

  @Delete(':id')
  async removeEmploye(@Param('id') empId: string) {
    try {
      const deletedEmployee = await this.productsService.deleteEmploye(empId);
      return deletedEmployee
    } catch (err) { return err }
  }
}
