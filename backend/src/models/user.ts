import jwt from "jsonwebtoken"
import config from "config"
import Joi from "joi"

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
            config.get("jwtPrivateKey")
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

function addUser(userData) {
  const { error } = validate(userData);
  if (error) return { error };

  const existing = users.find(u => u.email === userData.email);
  if (existing) return { error: "User already registered." };

  const user = new User(userData);
  users.push(user);
  return { user };
}

export {User, validate, addUser, users};