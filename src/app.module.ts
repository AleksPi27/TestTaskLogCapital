import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_CONNECTION_URL }  = process.env;

@Module({
    imports: [AuthModule,
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: MONGO_CONNECTION_URL,
            }),
        }),
        UsersModule
    ],
})
export class AppModule {}
