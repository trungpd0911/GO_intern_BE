import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { responseData } from 'src/global/globalClass';
import { Score } from 'src/schemas/Score.schema';

@Injectable()
export class ScoreService {
    constructor(
        @InjectModel(Score.name) private scoreModel: Model<Score>
    ) { }

    async getAllScores({ limit }: { limit: number }) {
        const topStudents = await this.scoreModel.aggregate([
            {
                $match: {
                    math: { $ne: null },
                    physics: { $ne: null },
                    chemistry: { $ne: null },
                }
            },
            {
                $addFields: {
                    totalScore: { $add: ["$math", "$physics", "$chemistry"] }
                }
            },
            {
                $sort: { totalScore: -1 }
            },
            {
                $limit: limit
            },
            {
                $project: {
                    studentId: 1,
                    math: 1,
                    physics: 1,
                    chemistry: 1,
                    totalScore: 1
                }
            }
        ]).exec();

        return new responseData(topStudents, 200, 'Successfully fetched top students');
    }

    async getScoreByStudentId(studentId: string) {
        const score = await this.scoreModel.findOne(
            { studentId },
            { createdAt: 0, updatedAt: 0, __v: 0 }
        ).exec();

        if (!score) {
            throw new BadRequestException('Score not found');
        }

        return new responseData(score, 200, 'Successfully fetched score');
    }

    async getScoreRangeCount() {
        const subjects = [
            "math",
            "literature",
            "foreignLanguage",
            "physics",
            "chemistry",
            "biology",
            "history",
            "geography",
            "civicEducation",
        ]

        // const scoreRanges = [
        //     { id: "less_than_4", min: null, max: 4 },
        //     { id: "between_4_and_6", min: 4, max: 6 },
        //     { id: "between_6_and_8", min: 6, max: 8 },
        //     { id: "greater_than_8", min: 8, max: null }
        // ];

        const result = [];

        for (const subject of subjects) {
            const scoreCounts = await this.scoreModel.aggregate([
                {
                    $match: {
                        [subject]: { $ne: null }
                    }
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                {
                                    $lt: [`$${subject}`, 4]
                                },
                                "less_than_4",
                                {
                                    $cond: [
                                        { $and: [{ $gte: [`$${subject}`, 4] }, { $lt: [`$${subject}`, 6] }] },
                                        "between_4_and_6",
                                        {
                                            $cond: [
                                                { $and: [{ $gte: [`$${subject}`, 6] }, { $lt: [`$${subject}`, 8] }] },
                                                "between_6_and_8",
                                                {
                                                    $cond: [
                                                        { $gte: [`$${subject}`, 8] },
                                                        "greater_than_8",
                                                        "unknown"
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        count: { $sum: 1 }
                    }
                }
            ]).exec();

            const subjectData = scoreCounts.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, { subject });

            result.push(subjectData);
        }

        return new responseData(result, 200, 'Successfully fetched score count');
    }
}
