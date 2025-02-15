export interface SendVerifyMailRequestPayload {
  to: string;
  verifyToken: string;
  type: "verify";
  subject: string;
}

export interface SendResetMailRequestPayload {
  to: string;
  resetToken: string;
  type: "reset";
  subject: string;
}

type SendMailRequestPayload =
  | SendVerifyMailRequestPayload
  | SendResetMailRequestPayload;

export default SendMailRequestPayload;
