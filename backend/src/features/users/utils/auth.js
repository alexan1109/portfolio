import { users } from "../../../data/users";
const parseCookie = (cookie) => {
    return Object.fromEntries(cookie.split(";").map((cookie) => cookie.trim().split("=")));
};
export function getUser(request) {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    console.log('Parsed cookies:', cookies); // Log the cookies for verification
    const id = cookies["user.id"];
    console.log('User ID from cookie:', id); // Log the extracted user ID
    return users.find((user) => user.id === id) ?? null; // Match against your user data
}
