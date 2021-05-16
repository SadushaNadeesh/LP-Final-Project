import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { SubjectService } from 'src/subject/subject.service';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { createContentDTO } from './create-content.dto';

@Controller('api')
export class ContentController {
    constructor(private contentService: ContentService, private subjectService: SubjectService){}

    @Get('content')
    async showAllContent() {
      // const content = await this.contentService.showAll();
      return await this.contentService.showAll();
      // return content;
      // return {
      //   statusCode: HttpStatus.OK,
      //   message: 'Content fetched successfully',
      //   content
      // };
    }
  
    @Post('content')
    async createcontent(@Body() data: createContentDTO){
      // return data;
      const subject_id = await this.subjectService.getSubjectById(data.subjectId);
      const contentData = await this.contentService.create(data, subject_id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Content created successfully',
        contentData
      };
    }
  
    @Get('content/:id')
    async readContent(@Param('id') id: number) {
      return await this.contentService.read(id);
      // const data = await this.contentService.read(id);
      // return {
      //   statusCode: HttpStatus.OK,
      //   message: 'content fetched successfully',
      //   data,
      // };
    }
  
    @Patch('content/:id')
    async uppdateContent(@Param('id') id: number, @Body() data: Partial<Content>) {
      await this.contentService.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'content updated successfully',
      };
    }
  
    @Delete('content/:id')
    async deleteContent(@Param('id') id: number) {
      await this.contentService.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'content deleted successfully',
      };
    }
}
