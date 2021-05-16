import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import { Results } from './results.entity';
import { ResultsService } from './results.service';

@Controller('api')
export class ResultsController {
    constructor(private resultService: ResultsService){}

    @Get('getresult')
      async showAllResults() {
        const results =  await this.resultService.showAll();
        return {
          statusCode: HttpStatus.OK,
          message: 'Results fetched successfully',
          results
        };
      }

      @Post('addresult')
      async createquestions(@Body() data: Results) {
         const result = await this.resultService.create(data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Result added successfully',
          result
        };
      }

      @Get('result/:id')
      async readResults(@Param('id') id: number) {
        const data =  await this.resultService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Results fetched successfully',
          data,
        };
      }

      @Patch('result/:id')
      async uppdaResults(@Param('id') id: number, @Body() data: Partial<Results>) {
        await this.resultService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'results updated successfully',
        };
      }

      @Delete('result/:id')
      async deleteResult(@Param('id') id: number) {
        await this.resultService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'results deleted successfully',
        };
      }

}
