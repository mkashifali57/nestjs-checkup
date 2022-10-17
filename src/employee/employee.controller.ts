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
  addEmploye(
    @Body('name') name: string,
    @Body('age') age: number,
  ) {
    const generatedId = this.productsService.addEmploye(
      name,
      age,

    );
    return { id: generatedId };
  }

  @Get()
  async getAllEmployee() {
    const employee = await this.productsService.getEmployee();
    return employee as any
  }

  @Get(':id')
  getEmploye(@Param('id') empId: string) {
    return this.productsService.getSingleEmploye(empId);
  }

  @Patch(':id')
  updateEmploye(
    @Param('id') empId: string,
    @Body('name') name: string,
    @Body('age') age: number,
  ) {
    this.productsService.updateEmploye(empId, name, age,);
    return null;
  }

  @Delete(':id')
  removeEmploye(@Param('id') empId: string) {
    this.productsService.deleteEmploye(empId);
    return null;
  }
}
