import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import { Courses } from './courses.entity';
import { CoursesService } from './courses.service';

@Controller('api')
export class CoursesController {
    constructor(private coursesService: CoursesService){}

    @Get('courses')
      async showAllCourses() {
        const course =  await this.coursesService.showAll();
        return {
          statusCode: HttpStatus.OK,
          message: 'Courses fetched successfully',
          course
        };
      }

      @Post('course')
      async createCourse(@Body() data: Courses) {
         const course = await this.coursesService.create(data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Course created successfully',
          course
        };
      }

      @Get('course/:id')
      async readCourse(@Param('id') id: number) {
        const data =  await this.coursesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Course fetched successfully',
          data,
        };
      }

      @Get('courseQuestions/:id')
      async readCourseWithQuestion(@Param('id') id: number) {
        const data =  await this.coursesService.getCourseById(id);
        const Qns = data.questions;
        
        return {
          statusCode: HttpStatus.OK,
          message: 'Course fetched successfully',
          // data,
          Qns
        };
      }

      // @Get('courseQuestionsAnswer/:id')
      // async readCourseWithQuestionAnswer(@Param('id') id: number) {
      //   const answer =  await this.coursesService.getCourseAnswerById(id);
        
      //   return {
      //     statusCode: HttpStatus.OK,
      //     message: 'Course fetched successfully',
      //     // data,
      //     answer
      //   };
      // }

      @Patch('course/:id')
      async uppdateCourse(@Param('id') id: number, @Body() data: Partial<Courses>) {
        await this.coursesService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Course updated successfully',
        };
      }

      @Delete('course/:id')
      async deleteCourse(@Param('id') id: number) {
        await this.coursesService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Course deleted successfully',
        };
      }

}
