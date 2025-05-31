# Card Memory Game – Full Stack & Blockchain Integration

## 1. Blockchain (Solidity & Hardhat)

### Setup
- Hardhat project initialized in `/blockchain`.
- Solidity version: 0.8.28.
- Clean `.gitignore` for Node/Hardhat projects.
- All config and dependencies are local to `/blockchain`.

### Smart Contract: `CardMemoryGame.sol`
- Stores each player's best score, address, and timestamp.
- On-chain validation: only positive scores allowed.
- Maintains a top-10 leaderboard (sorted, efficient update logic).
- Emits `NewResult` event on new best score.
- Security: Only updates best score if new score is higher.

### Deployment
- Clean deployment script: `blockchain/scripts/deploy.js`.
- Usage: `npx hardhat run scripts/deploy.js` (from `/blockchain`).

### Testing
- Senior-level test suite: `blockchain/test/CardMemoryGame.test.js`.
- Tests deployment, validation, best score logic, leaderboard, and event emission.
- Uses Chai, Hardhat toolbox, and best practices for Ethers v6.
- All tests pass.

---

## 2. Web3 Integration
- MetaMask/WalletConnect integration in frontend.
- Wallet address is persisted in localStorage and used in backend API calls.
- Wallet address is displayed in the game history table.
- Clean, accessible, and modern WalletConnect UI.

---

## 3. Backend (Node/Express/MongoDB)
- MongoDB model for game results (`Save`), including wallet address.
- Endpoints for saving and fetching results, with input validation (`express-validator`).
- Automated backend tests with Jest and Supertest.
- Test user creation and cleanup.
- Backend documented with cURL/Postman instructions and test running instructions.
- Deprecation warnings in MongoDB connection fixed.
- `.env` file properly gitignored; guided setup for MongoDB Atlas and connection string.
- Login controller fixed to avoid multiple response sends.

---

## 4. Frontend (React/Vite)
- Clean routing and authentication with React Router.
- Responsive, visually appealing Game History page (fetches and displays results from backend).
- Modern, beautiful login and register pages.
- Immersive app layout, fills viewport, no Vite demo styles.
- Global, sticky navbar with navigation links and logout button (responsive for desktop/mobile).
- Play page and background fully responsive, scalable for all devices.

---

## 5. Best Practices & Senior-Level Notes
- All code is clean, modular, and maintainable.
- Proper error handling and debugging throughout stack.
- All sensitive files and build artifacts are gitignored.
- Step-by-step confirmations and documentation for each major task.
- Ready for further extension (advanced contract features, testnet/mainnet deployment, frontend integration).

---

## 6. Frontend Automated Testing
- **Test Runner:** [Vitest](https://vitest.dev/) (Vite-native, fast, supports JSX/React out of the box).
- **Testing Library:** [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for user-centric component tests.
- **DOM Environment:** [jsdom](https://github.com/jsdom/jsdom) for simulating the browser.
- **Jest-DOM:** [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) for extended DOM matchers.
- **Media Mock:** `HTMLMediaElement.prototype.play` is mocked in `src/setupTests.js` to silence jsdom errors for audio/video.
- **Test Structure:**
  - All game modes (`MemoryCardGame`, `MemoryEasy`, `MemoryMedium`) have basic smoke tests for rendering, card flipping, and matching logic.
  - Tests are wrapped in `MemoryRouter` to provide routing context for `useNavigate`.
  - `localStorage` is mocked to provide a test user ID.
- **How to Run:**
  1. `cd frontend`
  2. `npm install` (if not already done)
  3. `npm run test` or `npx vitest run`
- **Best Practices:**
  - Expand tests to cover more UI states, edge cases, and API interactions.
  - Integrate with CI for automated test runs on every push/PR.
  - Keep tests isolated and fast for rapid feedback.

---

**For further details, see code comments and individual module documentation.** 