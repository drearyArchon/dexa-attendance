import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string, 
        pass: string
    ): Promise<{ access_token: string, userData: any }> {
        const user = await this.userService.findByUserName(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        
        const payload = {
            sub: user.user_id,
            user_id: user.user_id,
            username: user.username,
        };

        // TODO use bcrypt to encrypt passwords
        return {
            access_token: await this.jwtService.signAsync(payload),
            userData: {
                user_id: "1",
                username: "admin",
                role: "admin"
            }
        };
    }
}
