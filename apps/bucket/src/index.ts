import { WorkerEntrypoint } from "cloudflare:workers";
import { R2 } from "node-cloudflare-r2";

export default class extends WorkerEntrypoint<Env> {
	fetch() {
		return new Response("Hello from my-worker");
	}
	async getSignedUrls(ext: string, num: number = 1, filePrefix?: string) {
		try {
			const r2 = new R2({
				accountId: this.env.R2_ACCOUNT_ID,
				accessKeyId: this.env.R2_ACCESS_KEY_ID,
				secretAccessKey: this.env.R2_SECRET_ACCESS_KEY,
			});

			const bucket = r2.bucket(this.env.R2_BUCKET_NAME);

			if (!bucket.exists()) {
				throw new Error("Bucket does not exist");
			}

			const urls = [] as string[];
			for (let i = 0; i < num; i++) {
				const filename = filePrefix
					? `${filePrefix}-${crypto.randomUUID()}.${ext}`
					: `${crypto.randomUUID()}.${ext}`;
				const signedUrl = await bucket.getObjectSignedUrl(filename, 60 * 60);
				urls.push(signedUrl);
			}

			return urls;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
