import { CustomLink } from "./CustomLink";

export function Footer() {
  return (
    <footer className="flex flex-col w-full px-4 mx-0 my-4 space-y-1 text-sm md:max-w-3xl md:my-12 md:mx-auto sm:px-6 md:h-5 md:items-center md:space-y-0 md:space-x-4 md:flex-row">
      <CustomLink href="https://nextjs.authjs.dev">Documentation</CustomLink>
      <CustomLink href="https://www.npmjs.com/package/next-auth">
        NPM
      </CustomLink>
      <CustomLink href="https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs">
        Source on GitHub
      </CustomLink>
    </footer>
  );
}
