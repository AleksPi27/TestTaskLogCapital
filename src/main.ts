import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from "express-session";
import passport from "passport";
const {SESSION_SECRET} = process.env;
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();