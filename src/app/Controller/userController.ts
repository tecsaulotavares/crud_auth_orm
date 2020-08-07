import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../db/entity/User";
import { compareSync } from "bcryptjs";

class UserController {
  async auth(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User);

      const data = req.body;

      const user = await userRepository.findOne({
        where: { e_mail: data.e_mail },
      });

      if (user && !compareSync(data.password, user.password || "")) {
        return res.json({ error: "email or message not match" });
      }

      user && delete user.password;

      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req: Request, res: Response) {
    const data = req.body;

    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { e_mail: data.e_mail },
      });
      if (user) {
        return res.status(400).json("Email Exist");
      }
      const newUser = await userRepository.create(data);

      res.json(await userRepository.save(newUser));
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    let status = 200;
    try {
      const userRepository = getRepository(User);

      const user = userRepository
        .findOne(id)
        .then((result) => ({ ...result, password: undefined }));

      if (!user) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(await user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    let status = 200;
    try {
      const userRepository = getRepository(User);

      const user = userRepository
        .find()
        .then((result) =>
          result.map((item) => ({ ...item, password: undefined }))
        );

      if (!user) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(await user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const userRepository = getRepository(User);
      let user = await userRepository.findOne(id);
      if (!user) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(await userRepository.update(id, { ...user, ...data }));
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User);
      const { id } = req.params;

      const user = await userRepository.softDelete(id);

      console.log(user);

      return res.json({
        message: `Deleted ${user.affected} itens`,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
