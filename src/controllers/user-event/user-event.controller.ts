import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { UserEventService } from 'src/core/services';
import { CreateUserEventReqApiDto } from './dto/create-user-event.dto';
import { UpdateUserEventReqApiDto } from './dto/update-user-event.dto';
import { QueryOptions } from 'src/core/abstracts';

@Controller('userEvent')
export class UserEventController {
    constructor(private _userEventService: UserEventService) {}

    @Get()
    //@CheckAuth()
    async getCategories(@Body() options: QueryOptions): Promise<any> {
        const userEvent = await this._userEventService.getUserEvents(options);
        return userEvent;
    }

    @Get(':id')
    //@CheckAuth()
    async getHandler(@Param() params): Promise<any> {
        const userEvent = await this._userEventService.getUserEvent(params.id);
        return userEvent;
    }

    @Post()
    //@CheckAuth()
    async createHandler(@Body() userEventDto: CreateUserEventReqApiDto): Promise<any> {
        const userEvent = await this._userEventService.createUserEvent(userEventDto);
        return userEvent;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateHandler(@Param() params: number, @Body() userEventDto: UpdateUserEventReqApiDto): Promise<any> {
        const userEvent = await this._userEventService.updateUserEvent(params["id"], userEventDto);
        return userEvent;
    }
}
