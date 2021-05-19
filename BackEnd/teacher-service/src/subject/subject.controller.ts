import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

@Controller('api')
export class SubjectController {
  constructor(private subjectService: SubjectService) { }

  @Get('subject')
  async showAllSubject() {
    //return await this.subjectService.showAll();

      const subject =  await this.subjectService.showAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'subject fetched successfully',
        subject
      };
  }

  @Post('subject')
  async createSubject(@Body() data: Subject) {
    const subject = await this.subjectService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'subject created successfully',
      subject
    };
  }

  @Get('subject/:id')
  async readSubject(@Param('id') id: number) {

    return await this.subjectService.read(id);

    // const data =  await this.subjectService.read(id);
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: 'Subject fetched successfully',
    //   data,
    // };
  }

  @Get('subjectContent/:id')
  async readSubjectContent(@Param('id') id: number) {
    const content = await this.subjectService.getSubjectById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'content fetched successfully',
      content
    };
  }

  @Patch('subject/:id')
  async uppdateSubject(@Param('id') id: number, @Body() data: Partial<Subject>) {
    await this.subjectService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'subject updated successfully',
    };
  }

  @Delete('subject/:id')
  async deleteSubject(@Param('id') id: number) {
    await this.subjectService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subject deleted successfully',
    };
  }

}
