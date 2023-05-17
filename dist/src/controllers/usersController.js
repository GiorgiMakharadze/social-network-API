"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.changeUser = exports.makeUser = exports.getUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const userRepo_1 = __importDefault(require("../repos/userRepo"));
const errors_1 = require("../../errors");
const getAllUsers = async (req, res) => {
    const users = await userRepo_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "All users", users });
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userRepo_1.default.findById(id);
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id: ${id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
};
exports.getUser = getUser;
const makeUser = async (req, res) => { };
exports.makeUser = makeUser;
const changeUser = async (req, res) => { };
exports.changeUser = changeUser;
const deleteUser = async (req, res) => { };
exports.deleteUser = deleteUser;
