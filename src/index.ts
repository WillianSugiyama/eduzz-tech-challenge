import * as bodyParser from "body-parser"
import * as cookieParser from 'cookie-parser'
import * as express from "express"
import { UserWrapper } from "./core/business/user/user.wrap"
import { CreateUserDTO } from "./core/domain/validators/user/create-user.dto"
import { SignInDTO } from "./core/domain/validators/user/sign-in.dto"
import { Auth } from "./infrastructure/auth/auth"
import { AppDataSource } from "./infrastructure/database/data-source"
import { UserModel } from "./infrastructure/database/entities/user.entity"
import { authMiddleware } from "./infrastructure/middlewares/auth.middleware"
import { validationMiddleware } from "./infrastructure/middlewares/validation.middleware"

AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()

    app.use(bodyParser.json())
    app.use(cookieParser());

    const authService = new Auth();
    const userWrapper = new UserWrapper(AppDataSource.getRepository(UserModel), authService).getController();

    app.post("/auth/sign-up", validationMiddleware(CreateUserDTO), userWrapper.signUp);
    app.post("/auth/sign-in", validationMiddleware(SignInDTO), userWrapper.signIn);

    app.get("/me", authMiddleware, (req, res) => (res.send('oi')));

    // start express server
    app.listen(4002)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
