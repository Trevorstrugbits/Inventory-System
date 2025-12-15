import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import logger from '../config/logger.js';
class DatabaseService {
    constructor() {
        const pool = new pg.Pool({
            connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PrismaPg(pool);
        this.prisma = new PrismaClient({
            adapter,
            log: process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
        });
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    async connect() {
        try {
            await this.prisma.$connect();
            logger.info('Database connected successfully');
        }
        catch (error) {
            logger.error('Failed to connect to database:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.prisma.$disconnect();
            logger.info('Database disconnected successfully');
        }
        catch (error) {
            logger.error('Failed to disconnect from database:', error);
            throw error;
        }
    }
    async findOne(model, where, select) {
        return this.prisma[model].findUnique({
            where,
            ...(select && { select }),
        });
    }
    async findFirst(model, where, select) {
        return this.prisma[model].findFirst({
            where,
            ...(select && { select }),
        });
    }
    async findMany(model, options) {
        return this.prisma[model].findMany(options);
    }
    async findAll(model, select) {
        return this.prisma[model].findMany({
            ...(select && { select }),
        });
    }
    async create(model, data, select) {
        return this.prisma[model].create({
            data,
            ...(select && { select }),
        });
    }
    async createMany(model, data) {
        return this.prisma[model].createMany({
            data,
        });
    }
    async update(model, where, data, select) {
        return this.prisma[model].update({
            where,
            data,
            ...(select && { select }),
        });
    }
    async updateMany(model, where, data) {
        return this.prisma[model].updateMany({
            where,
            data,
        });
    }
    async upsert(model, where, create, update, select) {
        return this.prisma[model].upsert({
            where,
            create,
            update,
            ...(select && { select }),
        });
    }
    async delete(model, where) {
        return this.prisma[model].delete({
            where,
        });
    }
    async deleteMany(model, where) {
        return this.prisma[model].deleteMany({
            where,
        });
    }
    async count(model, where) {
        return this.prisma[model].count({
            ...(where && { where }),
        });
    }
    async exists(model, where) {
        const count = await this.count(model, where);
        return count > 0;
    }
    async transaction(callback) {
        return this.prisma.$transaction(callback);
    }
    async executeRaw(query, ...values) {
        return this.prisma.$executeRawUnsafe(query, ...values);
    }
    async queryRaw(query, ...values) {
        return this.prisma.$queryRawUnsafe(query, ...values);
    }
}
export const db = DatabaseService.getInstance();
export const prisma = db.prisma;
export default db;
