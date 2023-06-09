import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { takeLast } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('todo')
export class TodoController {
    constructor(
        private prisma: PrismaService
    ) { }
    
    @Get("list")
    async getList() {
        const result= await this.prisma.task.findMany()
        return [
            ...result
        ]
    }

    @Post("")
    async add(@Body() task: CreateTaskDto) {
        const result = await this.prisma.task.create({
            data:task
        })
        return {
            status:"OK"
        }
    }
    
    @Post(":id/done")
    async done(@Param() param:UpdateTaskDto) {
        await this.prisma.task.update({
            data: {
                is_done:true
            },
            where:{
                id:param.id
            }
        })
        return {
            status:"OK"
        }
        }

    @Get("view")
    getView() {
        return [
            {
                view:"これはviewです"
            }
        ]
    }
}
