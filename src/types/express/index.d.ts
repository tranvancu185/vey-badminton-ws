import Role, { RoleAttributes } from "@/databases/models/roles.model";
import User, { UserAttributes } from "@/databases/models/users.model";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            auth?: Record<string, any>;
        }
    }
}