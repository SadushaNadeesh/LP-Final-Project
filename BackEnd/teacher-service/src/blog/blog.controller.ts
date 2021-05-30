import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('api')
export class BlogController {

  SERVER_URL: string = "http://localhost:3001/api/";

  constructor(private blogService: BlogService) { }


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

  @Post('post/cover')
  @UseInterceptors(FileInterceptor('cover', {

    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //const extention = path.parse(file.originalname).ext;
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  uploadCover(@UploadedFile() file) {
    // this.blogService.setCover(`${this.SERVER_URL}${file.path}`);
    const filepath: string = `${this.SERVER_URL}${file.path}`;
    //console.log(filepath);
    // return filepath;
    return {
      file: filepath
    }
  }

  @Get('uploads/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
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
    const data = await this.blogService.readname(name);
    return {
      statusCode: HttpStatus.OK,
      message: 'blog post fetched successfully',
      data,
    };
  }

  @Patch('post/:id')
  async updateblog(@Param('id') id: number, @Body() data: Partial<Blog>) {
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