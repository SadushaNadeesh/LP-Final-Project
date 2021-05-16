import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from 'src/subject/subject.module';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { ContentService } from './content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    SubjectModule
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
