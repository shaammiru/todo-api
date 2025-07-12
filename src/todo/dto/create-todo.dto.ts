// import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'; // Cannot use due to npm install issues

export class CreateTodoDto {
  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsString()
  // @IsOptional()
  description?: string;

  // Note: 'completed' status is typically not part of CreateTodoDto,
  // as it's usually set to false by default on creation.
  // If it were allowed:
  // @IsBoolean()
  // @IsOptional()
  // completed?: boolean;
}
