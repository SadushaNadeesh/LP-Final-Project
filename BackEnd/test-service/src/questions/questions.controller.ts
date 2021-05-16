import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { createquestionsDTO } from './create-question.dto';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('api')
export class QuestionsController {
  constructor(private questionsService: QuestionsService, private courseService: CoursesService) { }

  @Get('getquestions')
  async showAllCourses() {
    const questions = await this.questionsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'questions fetched successfully',
      questions
    };
  }

  // @Post('addquestions')
  // async createquestions(@Body() data: Questions) {
  //    const questions = await this.questionsService.create(data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Question created successfully',
  //     questions
  //   };
  // }

  @Post('addquestions')
  async createquestions(@Body() question: createquestionsDTO){
    const course_id = await this.courseService.getCourseById(question.courseId);
    const questiondata = await this.questionsService.create(question, course_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Question created successfully',
      questiondata
    };
  }

  @Get('questions/:id')
  async readQuestion(@Param('id') id: number) {
    const data = await this.questionsService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'questions fetched successfully',
      data,
    };
  }

  @Patch('questions/:id')
  async uppdateQuestion(@Param('id') id: number, @Body() data: Partial<Questions>) {
    await this.questionsService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'questions updated successfully',
    };
  }

  @Delete('questions/:id')
  async deleteQuestion(@Param('id') id: number) {
    await this.questionsService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'question deleted successfully',
    };
  }


}
