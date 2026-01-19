"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, superAdmin, companyAdmin, company, location, employee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Start seeding ...');
                    return [4 /*yield*/, bcryptjs_1.default.hash('Password123!', 10)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'superadmin@resinwerks.com',
                                password: hashedPassword,
                                firstName: 'Super',
                                lastName: 'Admin',
                                role: client_1.UserRole.SUPERADMIN,
                            },
                        })];
                case 2:
                    superAdmin = _a.sent();
                    console.log("Created Super Admin: ".concat(superAdmin.email));
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'admin@company.com',
                                password: hashedPassword,
                                firstName: 'Company',
                                lastName: 'Admin',
                                role: client_1.UserRole.COMPANY, // This user is the main contact for the company
                            },
                        })];
                case 3:
                    companyAdmin = _a.sent();
                    return [4 /*yield*/, prisma.company.create({
                            data: {
                                name: 'Test Company',
                                email: 'contact@company.com',
                                approvedBySuperadmin: true,
                                isActive: true,
                                companyAdmin: {
                                    connect: {
                                        id: companyAdmin.id,
                                    },
                                },
                                // Associate the admin user with the company
                                users: {
                                    connect: {
                                        id: companyAdmin.id
                                    }
                                }
                            },
                        })];
                case 4:
                    company = _a.sent();
                    console.log("Created Company: ".concat(company.name, " with Admin: ").concat(companyAdmin.email));
                    return [4 /*yield*/, prisma.location.create({
                            data: {
                                name: 'Main Warehouse',
                                street: '123 Industrial Way',
                                city: 'Anytown',
                                state: 'CA',
                                postalCode: '12345',
                                country: 'USA',
                                approvedBySuperadmin: true,
                                company: {
                                    connect: {
                                        id: company.id,
                                    },
                                },
                            },
                        })];
                case 5:
                    location = _a.sent();
                    console.log("Created Location: ".concat(location.name, " for ").concat(company.name));
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'employee@company.com',
                                password: hashedPassword,
                                firstName: 'John',
                                lastName: 'Doe',
                                role: client_1.UserRole.EMPLOYEE,
                                company: {
                                    connect: {
                                        id: company.id,
                                    },
                                },
                                location: {
                                    connect: {
                                        id: location.id,
                                    },
                                },
                            },
                        })];
                case 6:
                    employee = _a.sent();
                    console.log("Created Employee: ".concat(employee.email));
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
