import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Slot, AllowedStatus } from './slot.model';

import { Model } from 'mongoose';
import { Employee } from 'src/employee/employee.model';
import { Venue } from 'src/venue/venue.model';

@Injectable()
export class SlotService {
  private employee: Slot[] = [];

  constructor(@InjectModel('Slot') private readonly slotModel: Model<Slot>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectModel('Venue') private readonly venueModel: Model<Venue>,
  ) { }

  async createSlot(venueId: string, employeeId: string, scheduledAt: Date, status: AllowedStatus, note: string) {

    try {

      const emp = await this.employeeModel.find().where({ _id: employeeId }).exec()
      if (!emp)
        throw new NotFoundException(`Employee not found`)
      const venu = await this.venueModel.find().where({ _id: venueId }).exec()
      if (!venu)
        throw new NotFoundException(`Venue not found`)

      const newSlot = new this.slotModel({
        venueId,
        employeeId,
        scheduledAt, status, note
      })
      const result = await newSlot.save();
      return result;
    } catch (err) {
      return err
    }
  }

  async getSlots() {
    try {
      const slots = await this.slotModel.find().exec();
      return slots
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  async getSingleSlot(slotId: string) {
    try {
      const slot = await this.slotModel.findById(slotId)
      if (!slot)
        throw new NotFoundException('Slot not found')
      return slot
    } catch (err) {
      return err;
    }
  }

  async updateSlot(slotId: string, venueId: string, employeeId: string, scheduledAt: Date, status: AllowedStatus, note: string) {
    try {
      if (status !== AllowedStatus.ALLOCATED_COMPLETED || AllowedStatus.ALLOCATED || AllowedStatus.ALLOCATED_CANCELLED) {
        throw new BadRequestException('Invalid inputs')
      }
      const updatedSlot = await this.slotModel.findByIdAndUpdate(slotId, { venueId, employeeId, scheduledAt, status, note }, { new: true });
      if (!updatedSlot)
        throw new NotFoundException('Slot not found')
      return updatedSlot
    } catch (err) { return err }
  }

  async deleteSlot(slotId: string) {
    try {
      const slot = await this.slotModel.findByIdAndDelete(slotId);
      if (!slot)
        throw new NotFoundException('Slot not found')
      return slot;
    } catch (err) {
      return err
    }

  }
}
