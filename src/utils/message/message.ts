import authMessage from "./auth.message";
import commonMessage from "./common.message";
import customersMessage from "./customers.message";
import usersMessage from "./users.message";
import validationMessage from "./validation.message";

const message: { [key: string]: { message: string, message_code: string } } = {
    ...authMessage,
    ...usersMessage,
    ...commonMessage,
    ...customersMessage,
    ...validationMessage
}
export default message