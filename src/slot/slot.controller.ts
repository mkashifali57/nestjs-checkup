import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { AllowedStatus, Slot } from './slot.model';

import { SlotService } from './slot.service';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @Post()
  async createSlot(
    @Body('venueId') venueId: string,
    @Body('employeeId') employeeId: string,
    @Body('scheduledAt') scheduledAt: Date,
    @Body('status') status: AllowedStatus,
    @Body('note') note: string,

  ) {
    try {
      const generatedId = await this.slotService.createSlot(
        venueId, employeeId, scheduledAt, status, note
      );
      return { id: generatedId };
    } catch (e) {
      return e
    }
  }

  @Get()
  async getAllSlots(): Promise<Slot[]> {
    try {
      const slots = await this.slotService.getSlots();
      return slots
    } catch (e) {
      console.log(e)
      return e
    }
  }

  @Get(':id')
  async getSlotById(@Param('id') empId: string) {
    try {
      return await this.slotService.getSingleSlot(empId);
    } catch (e) { console.log(e); return e }
  }

  @Patch(':id')
  async updateEmploye(
    @Param('id') slotId: string,
    @Body('venueId') venueId: string,
    @Body('employeeId') employeeId: string,
    @Body('scheduledAt') scheduledAt: Date,
    @Body('status') status: AllowedStatus,
    @Body('note') note: string,
  ) {
    try {
      console.log(status)
      const updatedSlot = this.slotService.updateSlot(slotId, venueId, employeeId, scheduledAt, status, note);
      if (!updatedSlot)
        throw new NotFoundException('Could not find slot.');
      return updatedSlot;
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  async removeEmploye(@Param('id') empId: string) {
    try {
      await this.slotService.deleteSlot(empId);
    } catch (err) { return err }
    this.slotService.deleteSlot(empId);
    return null;
  }
}
