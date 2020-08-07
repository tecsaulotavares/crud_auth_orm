import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Group from "../../db/entity/Groups";

class GroupController {
  async store(req: Request, res: Response) {
    const data = req.body;

    try {
      const groupRepository = getRepository(Group);

      res.json(await groupRepository.save(data));
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const groupRepository = getRepository(Group);

      const group = await groupRepository.findOne(id, { relations: ["user"] });

      if (!group) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(group);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const groupRepository = getRepository(Group);

      const group = await groupRepository.find({ relations: ["user"] });

      if (!group) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(group);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const groupRepository = getRepository(Group);
      let group = await groupRepository.findOne(id);

      if (!group) {
        return res.status(404).json({ error: "Object not found" });
      }

      group = await groupRepository.save({ ...group, ...data });

      return res.json(group);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const groupRepository = getRepository(Group);
      const { id } = req.params;

      const group = await groupRepository.softDelete(id);

      return res.json({
        message: `Deleted ${group.affected} itens`,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new GroupController();
