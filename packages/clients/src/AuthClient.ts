import { SelectUser } from "@sfs/db/users";
import { ApiResponse } from "@sfs/types/core";
import { CreateUserValidator } from "@sfs/validators";
import axios from "axios";

export class AuthClient {
  origin: string;
  constructor(origin: string) {
    this.origin = origin;
  }

  async createUser(data: CreateUserValidator) {
    const response = await axios.post<
      ApiResponse | ApiResponse<Pick<SelectUser, "id" | "email">>
    >(`${this.origin}/api/auth/user`, data);

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
}
export default AuthClient;
