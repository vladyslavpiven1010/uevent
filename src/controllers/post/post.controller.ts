import { Body, Controller, Post, Get, Query, Patch, Param } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { PostService } from 'src/core/services';
import { CreatePostReqApiDto } from './dto/create-post.dto';
import { UpdatePostReqApiDto } from './dto/update-post.dto';
import { QueryOptions } from 'src/core/abstracts';

@Controller('post')
export class PostController {
    constructor(private _postService: PostService) {}

    @Get()
    //@CheckAuth()
    async getCategories(@Query() query: any): Promise<any> {
        let options: QueryOptions = {
            where: undefined,
            orderBy: undefined,
            offset: undefined,
            limit: undefined
        }

        if (query.event_id !== 0 && query.event_id) {
            options.where = {
                event_id: query.event_id
            } 
        }

        console.log(options)
        
        const post = await this._postService.getPosts(options);
        return post;
    }

    @Get(':id')
    //@CheckAuth()
    async getHandler(@Param() params): Promise<any> {
        const post = await this._postService.getPost(params.id);
        return post;
    }

    @Post()
    //@CheckAuth()
    async createHandler(@Body() postDto: CreatePostReqApiDto): Promise<any> {
        const post = await this._postService.createPost(postDto);
        return post;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateHandler(@Param() params: number, @Body() postDto: UpdatePostReqApiDto): Promise<any> {
        const post = await this._postService.updatePost(params["id"], postDto);
        return post;
    }
}
