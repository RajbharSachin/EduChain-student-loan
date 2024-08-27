# 🎓 EDU Chain Student Loan Platform

Welcome to the **EDU Chain Student Loan Platform**! This project demonstrates a decentralized application (dApp) for managing student loans on the Ethereum blockchain. The platform allows users to create and repay student loans, with all interactions secured through smart contracts.

## 🚀 Quick Start Guide

### Step 1: Set Up the Development Environment

1. **Install Node.js and npm**  
   Download and install Node.js and npm from the [official website](https://nodejs.org/).

2. **Install Truffle**  
   Truffle is a popular development framework for Ethereum. Install it globally using npm:
   ```bash
   npm install -g truffle
   ```

3. **Install Ganache**  
   Ganache provides a personal Ethereum blockchain for development. Download and install it from [here](https://www.trufflesuite.com/ganache).

### Step 2: Create the Project Structure

Set up your project with the following structure:

```bash
edu-chain-student-loans/
├── contracts/
│   └── StudentLoanPlatform.sol
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── src/
│   ├── index.html
│   └── js/
│       └── app.js
├── test/
│   └── student_loan_platform.js
├── truffle-config.js
└── package.json
```

### Step 3: Smart Contract Development

Create the `StudentLoanPlatform.sol` file in the `contracts/` directory.

### Step 4: Create Migration Files

In the `migrations/` directory, create the following files:

- `1_initial_migration.js`
- `2_deploy_contracts.js`

### Step 5: Configure Truffle

Add a `truffle-config.js` file in the root directory.

### Step 6: Frontend Development

Create `index.html` in the `src/` directory to serve as the user interface.

### Step 7: Set Up the Project

1. **Initialize a new npm project**  
   ```bash
   npm init -y
   ```

2. **Install required dependencies**  
   ```bash
   npm install @openzeppelin/contracts
   ```

### Step 8: Compile and Deploy the Smart Contract

1. **Start Ganache**  
   Run a local Ethereum blockchain using Ganache.

2. **Compile the smart contract**  
   ```bash
   truffle compile
   ```

3. **Deploy the smart contract**  
   ```bash
   truffle migrate
   ```

   Note the deployed contract address and update the `contractAddress` in `app.js`. Copy the contract ABI from `build/contracts/StudentLoanPlatform.json` and paste it into the `contractABI` array in `app.js`.

### Step 9: Run the Application

1. **Install a local web server** (if not already installed)  
   ```bash
   npm install -g http-server
   ```

2. **Start the local web server**  
   ```bash
   http-server src
   ```

3. **Open the application**  
   Navigate to `http://localhost:8080` in your web browser.

### Step 10: Interact with the Application

1. **Connect your wallet** (e.g., MetaMask) to the local Ganache network.
2. **Use the application**  
   - Create and repay loans.
   - View your loans and all active loans in the respective tables.

## 📚 Additional Features

- **Test ERC20 Token**  
  Deploy a test ERC20 token contract to use with the platform.
  
- **Error Handling**  
  Implement proper error handling and input validation in the frontend.

- **Unit Testing**  
  Add more unit tests in the `test/` directory to ensure contract functionality.

- **Security**  
  For a production environment, add more security measures and consider deploying to a testnet or mainnet.

## 🛠️ Built With

- [Truffle](https://www.trufflesuite.com/) - Development framework for Ethereum
- [Ganache](https://www.trufflesuite.com/ganache) - Personal blockchain for Ethereum development
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract library

## 💡 Important Notes

- Replace `"YOUR_CONTRACT_ADDRESS"` in `app.js` with the actual deployed contract address.
- Fill in the `contractABI` array with the ABI of your deployed contract.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
