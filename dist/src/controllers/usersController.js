"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.changeUser = exports.makeUser = exports.getUser = exports.getAllUsers = void 0;
const user_repo_1 = __importDefault(require("../repos/user-repo"));
const getAllUsers = async (req, res) => {
    const users = await user_repo_1.default.find();
    res.send(users);
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => { };
exports.getUser = getUser;
const makeUser = async (req, res) => { };
exports.makeUser = makeUser;
const changeUser = async (req, res) => { };
exports.changeUser = changeUser;
const deleteUser = async (req, res) => { };
exports.deleteUser = deleteUser;
