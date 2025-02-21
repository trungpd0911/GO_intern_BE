import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from 'src/schemas/Score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Score.name,
        schema: ScoreSchema
      }
    ])
  ],
  providers: [SeedService]
})
export class SeedModule {}
