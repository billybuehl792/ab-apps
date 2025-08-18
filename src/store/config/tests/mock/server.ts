import { setupServer } from "msw/node";
import apiMock from "./api";

const server = setupServer(...apiMock);

export default server;
