import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Controller('api')
export class BlogController {
    constructor(private blogService: BlogService){}

    @Get('post')
      async showAllResults() {

        return await this.blogService.showAll();

        // const blog =  await this.blogService.showAll();
        // return {
        //   statusCode: HttpStatus.OK,
        //   message: 'Post fetched successfully',
        //   blog
        // };
      }

      @Post('post')
      async createblog(@Body() data: Blog) {
         const blog = await this.blogService.create(data);
        return {
          statusCode: HttpStatus.OK,
          message: 'blog post added successfully',
          blog
        };
      }

      @Get('post/:id')
      async readblog(@Param('id') id: number) {

        return await this.blogService.read(id);

        // const data =  await this.blogService.read(id);
        // return {
        //   statusCode: HttpStatus.OK,
        //   message: 'blog post fetched successfully',
        //   data,
        // };
      }

      @Get('post/:name')
      async searchblog(@Param('name') name: string) {
        const data =  await this.blogService.readname(name);
        return {
          statusCode: HttpStatus.OK,
          message: 'blog post fetched successfully',
          data,
        };
      }

      @Patch('post/:id')
      async uppdablog(@Param('id') id: number, @Body() data: Partial<Blog>) {
        await this.blogService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'blog post updated successfully',
        };
      }

      @Delete('post/:id')
      async deleteblog(@Param('id') id: number) {
        await this.blogService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'blog post deleted successfully',
        };
      }

}
