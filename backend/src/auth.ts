import type { Users } from "./types/users";
import {users} from "./data/users";

const parseCookie = (cookie: string) => {
    return Object.fromEntries(
      cookie.split(";").map((cookie) => cookie.trim().split("="))
    );
  };
  
  export function getUser(request: Request): Users | null {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");

    const id = cookies["user.id"];
    return users.find((user) => user.id === id) ?? null;
  }