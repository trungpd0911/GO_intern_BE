import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService
    ) {}

    @Get("/")
    async getAllScores(
        @Query("limit") limit?: string,
    ) {
        if(!limit || isNaN(parseInt(limit))) {
            throw new BadRequestException("Limit is required and must be a number");
        }
        return await this.scoreService.getAllScores({ limit: parseInt(limit) });   
    }

    @Get("/studentId/:studentId")
    async getScoreByStudentId(
        @Param("studentId") studentId: string
    ) {
        if(!studentId) {
            throw new BadRequestException("Student ID is required");
        }
        return await this.scoreService.getScoreByStudentId(studentId);
    }

    @Get("/range-score-count")
    async getScoreRangeCount() {
        return await this.scoreService.getScoreRangeCount();
    }
}
