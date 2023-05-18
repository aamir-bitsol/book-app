import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateCollectionDTO, UpdateCollectionDTO } from './collection.dto';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Get all collection' })
  @ApiResponse({ status: 200, description: 'Returns an array of collections' })
  @Get()
  getAllCollection() {
    return this.collectionService.getAllCollections();
  }

  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({
    status: 201,
    description: 'Returns the newly created collection',
  })
  @Post()
  async createCollection(@Body() createCollectionDto: CreateCollectionDTO) {
    return await this.collectionService.createCollection(createCollectionDto);
  }

  @ApiOperation({ summary: 'Get specific collection' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single collection record',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to get the record against given ID',
  })
  @Get(':id')
  getSpecificCollection(@Param('id') id: number) {
    return this.collectionService.getSpecificCollection(id);
  }

  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to update the specific user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'This API will update user information if the given ID exists in DB.',
  })
  @ApiBadRequestResponse({
    description:
      'Request Data is incomplete. Please double check the data for user.',
    status: 400,
  })
  @Put(':id')
  updateCollection(
    @Param('id') id: number,
    @Body() collectionData: UpdateCollectionDTO,
  ): Promise<any> {
    return this.collectionService.updateCollection(id, collectionData);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @ApiResponse({
    status: 200,
    description: 'Delete the record against given ID',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to delete the record against given ID',
  })
  @Delete(':id')
  deleteCollection(@Param('id') id: number) {
    return this.collectionService.deleteCollection(id);
  }
}
