import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Permission from "../../db/entity/Permissions";

class PermissionController {
  async store(req: Request, res: Response) {
    const data = req.body;

    try {
      const permissionRepository = getRepository(Permission);

      const permissionCreate = permissionRepository.create(data);

      // console.log(permissionCreate);

      res.json(await permissionRepository.save(data));
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const permissionRepository = getRepository(Permission);

      const permission = await permissionRepository.findOne(id);

      if (!permission) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(permission);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const permissionRepository = getRepository(Permission);

      const permission = await permissionRepository.find();

      if (!permission) {
        return res.status(404).json({ error: "Object not found" });
      }

      return res.json(permission);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const permissionRepository = getRepository(Permission);
      let permission = await permissionRepository.findOne(id);

      if (!permission) {
        return res.status(404).json({ error: "Object not found" });
      }

      permission = await permissionRepository.save({ ...permission, ...data });

      return res.json(permission);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const permissionRepository = getRepository(Permission);
      const { id } = req.params;

      const permission = await permissionRepository.softDelete(id);

      return res.json({
        message: `Deleted ${permission.affected} itens`,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new PermissionController();
