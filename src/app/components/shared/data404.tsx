// src/app/components/shared/data404.tsx
export const dev404Data = {
  title: "404: DEV_ZONE",
  subtitle: "// This page is compiling...",
  errorMessage: "ERROR_404: Page not found",
  codeSnippets: [
    `function Page() {\n  return <UnderConstruction />;\n}`,
    `const newPage = await compile({\n  components: ['Next.js', 'Tailwind']\n});`,
    `interface PageProps {\n  status: 'currently building' ;\n  eta: check back soon;\n}`,
    `// TODO: Implement this page\n// Current Status: Developing`
  ],
  commands: [
      { cmd: "npm run build", output: "Page under active development. Check back soon." },
      { cmd: "npm run build --status", output: "Under Construction" },
      { cmd: "npm run dev", output: "Development server running at localhost:3000" },
      { cmd: "git diff", output: "Changes not staged for commit." }
  ],
  animations: ["█", "▉", "▊", "▋", "▌", "▍", "▎", "▏", " ", "▏", "▎", "▍", "▌", "▋", "▊", "▉"]
};