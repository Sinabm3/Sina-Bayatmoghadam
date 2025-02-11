export interface CompassGameDto {
  id: string;
  name: string;
  horizontalAxisPositiveName: string;
  horizontalAxisNegativeName: string;
  verticalAxisPositiveName: string;
  verticalAxisNegativeName: string;
  questionDtos: QuestionDto[];
}

export interface InfoCompassGameDto {
  id: string;
  name: string;
  horizontalAxisPositiveName: string;
  horizontalAxisNegativeName: string;
  verticalAxisPositiveName: string;
  verticalAxisNegativeName: string;
}

export interface QuestionDto {
  id: string;
  text: string;
  isHorizontal: boolean;
  axisPower: number;
}
