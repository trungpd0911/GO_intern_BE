import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from 'src/schemas/Score.schema';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class SeedService {
    constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) { }

    private parseNumber = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    };

    async seedDataFromCsv(filePath: string): Promise<void> {
        const results: Score[] = [];
        const batchSize = 1000;

        const processBatch = async (batch: Score[]) => {
            try {
                await this.scoreModel.insertMany(batch);
                console.log(`Inserted batch of ${batch.length} records`);
            } catch (error) {
                console.error('Error inserting batch:', error);
            }
        };

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const score: Score = {
                    studentId: data.sbd,
                    math: this.parseNumber(data.toan),
                    literature: this.parseNumber(data.ngu_van),
                    foreignLanguage: this.parseNumber(data.ngoai_ngu),
                    physics: this.parseNumber(data.vat_li),
                    chemistry: this.parseNumber(data.hoa_hoc),
                    biology: this.parseNumber(data.sinh_hoc),
                    history: this.parseNumber(data.lich_su),
                    geography: this.parseNumber(data.dia_li),
                    civicEducation: this.parseNumber(data.gdcd),
                    foreignLanguageCode: data.ma_ngoai_ngu,
                };
                results.push(score);

                if (results.length >= batchSize) {
                    processBatch(results.slice());
                    results.length = 0; // Clear the array
                }
            })
            .on('end', async () => {
                if (results.length > 0) {
                    await processBatch(results);
                }
                console.log('Data successfully seeded');
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
            });
    }
}