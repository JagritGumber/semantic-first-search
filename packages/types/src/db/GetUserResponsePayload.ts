import { SelectUser } from "@sfs/db/schema/users";

type GetUserResponsePayload = {
  user: SelectUser;
};

export default GetUserResponsePayload;
