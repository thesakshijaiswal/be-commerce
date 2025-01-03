import bcrypt from "bcryptjs";
const users = [
  {
    name: "Samual Doe",
    email: "samual@email.com",
    password: bcrypt.hashSync("456789", 10),
    isAdmin: false,
  },
  {
    name: "peter john",
    email: "John@email.com",
    password: bcrypt.hashSync("567891", 10),
    isAdmin: false,
  },
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;