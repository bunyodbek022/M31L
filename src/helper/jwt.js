import jwt from "jsonwebtoken";
const secret = "qwer12345";

const payload = {
    id: 12,
    name: "Umar",
    role: "Teacher",
    staffId: 1233434
};
const experesIn = {experesIn: '2s'}

const token = jwt.sign(payload, secret, experesIn);

console.log(token)