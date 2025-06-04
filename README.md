# GitHub Repo Explorer

A **React + TypeScript** web app to search GitHub users and explore their repositories. Built with **Vite**, **Tailwind CSS**, and **Axios**.

Live Demo follow this Link : https://fadliev.github.io/github-repo-explorer/

![gif-image](/demo.gif)

---

## Features

1. ✅ Search GitHub users by username
2. ✅ Display user profile details
3. ✅ Pagination of search results (5 users per page)
4. ✅ Lazy load repositories per user (with infinite scroll)

---

## Project Structure

```
src/
├── assets/
├── components/         # React UI components
├── hooks/              # Custom hooks (e.g., useGithubSearch)
├── models/             # TypeScript models (User, Repo, Pagination)
├── services/           # API service layer (githubService, apiClient)
├── utils/              # Helper utilities (parseAxiosError)
├── styles/             # Tailwind CSS files
├── App.tsx             # Main App component
└── main.tsx            # ReactDOM entry
```

The folder structure follows a feature-modular approach with clear separation of concerns. As projects grow in complexity, the structure may evolve to include:

- ***Feature-based grouping***: Larger applications might group files by feature (e.g., users/, repos/) containing their own components, hooks, and types
- ***Testing directories***: Either colocated tests (__tests__ folders) or a separate tests/ directory
- ***State management***: Additional folders for store/ (Redux) or contexts/ if needed
- ***Route management***: routes/ or pages/ folder for routing configurations

For deeper insights on scalable React project structures, refer to: : https://dev.to/itswillt/folder-structures-in-react-projects-3dp8 

---

## Environment Setup

### Prerequisites

- [Node.js (v18 or later recommended)](https://nodejs.org/en/download)
- [Git](https://git-scm.com/)

### Installation Steps

1. Clone repository:

   ```bash
   git clone https://github.com/fadliEv/github-repo-explorer.git
   cd github-repo-explorer
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

   **Troubleshooting**: If encountering dependency errors:

    ```bash
   rm -rf package-lock.json node_modules
   npm install --legacy-peer-deps
   ```

3. Create `.env` file:

   ```bash
   VITE_BASE_URL=https://api.github.com   
   VITE_ITEMS_PER_PAGE=5
   ```
4. Start local dev server:

   ```bash
   npm run dev
   ```   
---

## Deployment

1. Update `package.json`:

   ```json
   "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
   ```
2. Set `base` in `vite.config.ts`:

   ```ts
   base: '/<your-repo-name>/'
   ```
3. Build & deploy to GitHub Pages:

   ```bash
   npm run predeploy
   npm run deploy
   ```
   **Deploy Reference**: [react-gh-pages Guide](https://github.com/gitname/react-gh-pages)
---

## ⚠️ Notes

### API Rate Limits Notice : 
- Current implementation uses unauthenticated GitHub API **(60 requests/hour limit)**
- ***Never expose tokens in client-side code***, To increase the API rate limit using a GitHub token, please note this introduces deployment security concerns. GitHub's token protection requires a server-side solution as the ideal architecture. The recommended approach is:
   - Create a backend service (Node.js/Express, etc.) to handle authentication
   - Store and manage tokens securely on the server
   - Have the frontend communicate only with your proxy endpoint

This pattern ensures tokens never get exposed to client-side code while still allowing higher rate limits.

More Explanation About limitation API Follow this link : https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28