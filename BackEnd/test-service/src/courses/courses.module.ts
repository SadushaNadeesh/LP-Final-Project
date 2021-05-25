import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from '../questions/questions.module';
import { CoursesController } from './courses.controller';
import { Courses } from './courses.entity';
import { CoursesService } from './courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Courses])

  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
