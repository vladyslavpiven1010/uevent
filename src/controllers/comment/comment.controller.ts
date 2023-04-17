import { Body, Controller, Post, Get, Patch, Param, Query } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { CommentService } from 'src/core/services';
import { CreateCommentReqApiDto } from './dto/create-comment.dto';
import { UpdateCommentReqApiDto } from './dto/update-comment.dto';
import { QueryOptions } from 'src/core/abstracts';

@Controller('comment')
export class CommentController {
    constructor(private _CommentService: CommentService) {}

    @Get()
    //@CheckAuth()
    async getComments(@Query() query: any): Promise<any> {
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
        
        const Comment = await this._CommentService.getComments(options);
        return Comment;
    }

    @Get(':id')
    //@CheckAuth()
    async getComment(@Param() params): Promise<any> {
        const Comment = await this._CommentService.getComment(params.id);
        return Comment;
    }

    @Post()
    //@CheckAuth()
    async createComment(@Body() CommentDto: CreateCommentReqApiDto): Promise<any> {
        console.log(CommentDto)
        const Comment = await this._CommentService.createComment(CommentDto);
        return Comment;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateComment(@Param() params: number, @Body() CommentDto: UpdateCommentReqApiDto): Promise<any> {
        const Comment = await this._CommentService.updateComment(params["id"], CommentDto);
        return Comment;
    }
}
