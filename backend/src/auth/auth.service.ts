
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) { }

	// Reference to user.entity created - user.entity was injected in user.services
	// async validateUser(username: string, pass: string): Promise<any> {
	// 	const user = await this.usersService.findOne(username);
	// 	if (user && user.password === pass) {
	// 		const { password, ...result } = user;
	// 		return result;
	// 	}
	// 	return null;
	// }
}
