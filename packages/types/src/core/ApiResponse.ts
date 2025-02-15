export default interface ApiResponse<T extends Record<string, any> = {}> {
  success: boolean;
  data: T | null;
  code?: string;
  message?: string;
}
