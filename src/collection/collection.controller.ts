import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CollectionService } from './collection.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateCollectionDTO } from './collection.dto';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Get all collection' })
  @ApiResponse({ status: 200, description: 'Returns an array of collections' })
  @Get()
  getAllCollection(@Res() res: Response) {
    return this.collectionService.getAllCollections();
  }

  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({ status: 201, description: 'Returns an array of collections' })
  @Post()
  async createCollection(
    
    @Body() createCollectionDto: CreateCollectionDTO,
  ) {
    return await this.collectionService.createCollection(createCollectionDto);
  }

  @ApiOperation({ summary: 'Get specific collection' })
  @ApiResponse({ status: 200, description: 'Returns an array of collections' })
  @Get(':id')
  getSpecificCollection(
    @Res() res: Response,
    @Param('id') id: number) {
    return this.collectionService.getSpecificCollection(id);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @ApiResponse({ status: 200, description: 'Returns an array of collections' })
  @Delete(':id')
  deleteCollection(
    @Res() res: Response,
    @Param('id') id: number
    ) {
    return this.collectionService.deleteCollection(id);
  }
}
