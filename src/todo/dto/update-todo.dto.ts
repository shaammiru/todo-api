// import { IsString, IsOptional, IsBoolean } from 'class-validator'; // Cannot use due to npm install issues

export class UpdateTodoDto {
  // @IsString()
  // @IsOptional()
  title?: string;

  // @IsString()
  // @IsOptional()
  description?: string;

  // @IsBoolean()
  // @IsOptional()
  completed?: boolean;
}
