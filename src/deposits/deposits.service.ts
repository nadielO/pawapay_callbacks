import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { FirebaseRepository } from '../firebase.module';

@Injectable()
export class DepositsService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async create(createDepositDto: CreateDepositDto) {
    const db = this.firebaseRepository.db;
    const depositRef = db.collection('deposits').doc();
    await depositRef.set(createDepositDto);
    return `This action adds a new deposit with ID: ${depositRef.id}`;
  }

  async findAll() {
    const db = this.firebaseRepository.db;
    const snapshot = await db.collection('deposits').get();
    return snapshot.docs.map(doc => doc.data());
  }

  async findOne(id: string) {
    const db = this.firebaseRepository.db;
    const depositRef = db.collection('deposits').doc(id);
    const doc = await depositRef.get();
    if (!doc.exists) {
      return `No deposit found with ID: ${id}`;
    }
    return doc.data();
  }

  async update(id: string, updateDepositDto: UpdateDepositDto) {
    const db = this.firebaseRepository.db;
    const depositRef = db.collection('deposits').doc(id);
    await depositRef.update({ ...updateDepositDto });
    return `This action updates a #${id} deposit`;
  }

  async remove(id: string) {
    const db = this.firebaseRepository.db;
    const depositRef = db.collection('deposits').doc(id);
    await depositRef.delete();
    return `This action removes a #${id} deposit`;
  }
}
