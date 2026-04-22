// Stub para evitar que Playwright infle el bundle en entornos serverless (Vercel)
export const chromium = {
  launch: async () => ({}),
  launchPersistentContext: async () => ({})
};
export default { chromium };
