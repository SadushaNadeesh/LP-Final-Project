import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './results.controller';
import { Results } from './results.entity';
import { ResultsService } from './results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Results])
  ],
  controllers: [ResultsController],
  providers: [ResultsService]
})
export class ResultsModule {}
