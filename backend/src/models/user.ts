import jwt from "jsonwebtoken";
import config from "config";
import Joi from "joi";
import bcrypt from "bcrypt";

class User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor({email, password, isAdmin = false}) {
        this.id = User.generateId();
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    generateAuthToken() {
        const token = jwt.sign(
            { _id: this.id, isAdmin: this.isAdmin },
            config.get("jwtPrivateKey"), {
              expiresIn: "1hr"
            }
        );

        return token;
    }
    
    static generateId() {
        return users.length + 1;
    }
}

const users = [];

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });

  return schema.validate(user);
}

async function addUser(userData) {
  const { error } = validate(userData);
  if (error) return { error };

  const existing = users.find(u => u.email === userData.email);
  if (existing) return { error: "User already registered." };

  const user = new User(userData);

  const salt = await bcrypt.genSalt(10);
  user.password =  await bcrypt.hash(user.password, salt);

  users.push(user);
  return { user };
}

function findOne(email) {
  const user = users.find(u => u.email === email);

  if (!user) {
    new Error("Invalid email or password.");
    console.log("User not found by that email");
    return;
  }

  return user;
}

function findUser(id) {
  const user = users.find(u => u.id === id);

  if (!user) {
    new Error("User does not exist.");
    return;
  }

  return user;
}

export {User, validate, addUser, findUser, findOne};