/**
 * @returns {{
 *      id: string;
 *      name: string;
 *      mobile: string;
 *      panNumber: number | null;
 *      roll: "admin" | "member";
 *      status: "active" | "inactive";
 *      bankDetails: object | null;
 *      activatedAt: string | null;
 *      updatedAt: string;
 *      createdAt: string;
 *      sponsoredBy: string | null;
 *      epinId: string | null;
 * } | null} user
 */
export default () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user;
};