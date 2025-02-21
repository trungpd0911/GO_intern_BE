import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
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
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule {}
