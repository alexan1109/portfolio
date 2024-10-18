import type { User } from "../types/users";
import {users} from "../../../data/users";
import { DB } from "../../../db/db";

const parseCookie = (cookie: string) => {
    return Object.fromEntries(
      cookie.split(";").map((cookie) => cookie.trim().split("="))
    );
  };
  
  export async function getUser(
    request: Request,
    db: DB
  ): Promise<User | undefined> {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    const id = cookies["user.id"];
  
    // TODO: Service call er også mulig
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
      | User
      | undefined;
  }