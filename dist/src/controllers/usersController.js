"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.changeUser = exports.insertUser = exports.getUser = exports.getAllUsers = void 0;
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
const insertUser = async (req, res) => {
    const { username, bio } = req.body;
    const user = await userRepo_1.default.insert(username, bio);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "New user created!", user });
};
exports.insertUser = insertUser;
const changeUser = async (req, res) => {
    const { id } = req.params;
    const { username, bio } = req.body;
    const user = await userRepo_1.default.update(id, username, bio);
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id: ${id} to update`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "User updated!", user });
};
exports.changeUser = changeUser;
const deleteUser = async (req, res) => { };
exports.deleteUser = deleteUser;
