import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { User, user_roles } from './user.entity';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    @Post('signup')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('roles') roles: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
            roles: user_roles.USER
        });

        return user;
    }

    @Post('signin')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.usersService.findOne({ email });

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id, name: user.name, email: user.email, roles: user.roles });

        //return response.cookie('jwt', jwt, { httpOnly: true });
        response.cookie('jwt', jwt, { httpOnly: true });

        //return jwt;
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            jwt
          };
    }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.usersService.findOne({ id: data['id'] });

            return user;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
    
    @Get('users')
    async showAllUsers(){
        const users = await this.usersService.showAll();

        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users
          };
    }

    @Get('user/:id')
      async readUser(@Param('id') id: number) {
        const data =  await this.usersService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'user fetched successfully',
          data,
        };
      }

      @Patch('user/:id')
      async uppdateUser(@Param('id') id: number, @Body() data: Partial<User>) {
        await this.usersService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'User updated successfully',
        };
      }

}
