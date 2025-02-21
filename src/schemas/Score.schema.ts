import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Score {
	@Prop({ required: true, type: String })
	studentId: string;

	@Prop({ required: false, type: Number })
	math: number;
	
	@Prop({ required: false, type: Number })
	literature: number;

	@Prop({ required: false, type: Number })
	foreignLanguage: number;

	@Prop({ required: false, type: Number })
	physics: number;

	@Prop({ required: false, type: Number })
	chemistry: number;

	@Prop({ required: false, type: Number })
	biology: number;

	@Prop({ required: false, type: Number })
	history: number;

	@Prop({ required: false, type: Number })
	geography: number;

	@Prop({ required: false, type: Number })
	civicEducation: number;

	@Prop({ required: false, type: String })
	foreignLanguageCode: string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
