let contract;
let signer;
let connectedAddress;

const contractAddress = "0x56446074091e7473d2b088e816190611fFe84e30"; // Replace with your deployed contract address
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "loanId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LoanCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "loanId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        }
      ],
      "name": "LoanRepaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "minLoanAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxLoanAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "minInterestRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxInterestRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "minDuration",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxDuration",
          "type": "uint256"
        }
      ],
      "name": "PlatformParametersUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "loanCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "loans",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "interest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxInterestRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxLoanAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minInterestRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minLoanAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_interest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        }
      ],
      "name": "createLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanId",
          "type": "uint256"
        }
      ],
      "name": "repayLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanId",
          "type": "uint256"
        }
      ],
      "name": "calculateRepaymentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_loanId",
          "type": "uint256"
        }
      ],
      "name": "getLoanDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "interest",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            }
          ],
          "internalType": "struct StudentLoanPlatform.Loan",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyLoans",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllActiveLoans",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_minLoanAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxLoanAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minInterestRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxInterestRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minDuration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxDuration",
          "type": "uint256"
        }
      ],
      "name": "updatePlatformParameters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]; // Replace with your contract ABI

async function connectWallet() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        connectedAddress = await signer.getAddress();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        document.getElementById('connectWallet').textContent = `Connected: ${connectedAddress.substring(0, 6)}...${connectedAddress.substring(38)}`;
        await updateLoans();
    } catch (error) {
        showMessage("Error connecting wallet: " + error.message);
    }
}

async function createLoan(event) {
    event.preventDefault();
    try {
        const amount = ethers.utils.parseEther(document.getElementById("loanAmount").value);
        const interest = document.getElementById("loanInterest").value;
        const duration = document.getElementById("loanDuration").value * 86400; // Convert days to seconds
        const tx = await contract.createLoan(amount, interest, duration);
        await tx.wait();
        showMessage("Loan created successfully!");
        await updateLoans();
    } catch (error) {
        showMessage("Error creating loan: " + error.message);
    }
}

async function repayLoan(event) {
    event.preventDefault();
    try {
        const loanId = document.getElementById("repayLoanId").value;
        const tx = await contract.repayLoan(loanId);
        await tx.wait();
        showMessage("Loan repaid successfully!");
        await updateLoans();
    } catch (error) {
        showMessage("Error repaying loan: " + error.message);
    }
}

async function updateLoans() {
    await updateMyLoans();
    await updateAllLoans();
}

async function updateMyLoans() {
    const myLoanIds = await contract.getMyLoans();
    const myLoansElement = document.getElementById("myLoans");
    myLoansElement.innerHTML = '<table class="table"><thead><tr><th>ID</th><th>Amount</th><th>Interest</th><th>Duration</th><th>Status</th><th>Repayment Amount</th></tr></thead><tbody id="myLoansBody"></tbody></table>';
    const myLoansBody = document.getElementById("myLoansBody");

    for (let id of myLoanIds) {
        const loan = await contract.getLoanDetails(id);
        const repaymentAmount = await contract.calculateRepaymentAmount(id);
        
        const row = myLoansBody.insertRow();
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = ethers.utils.formatEther(loan.amount) + " EDU";
        row.insertCell(2).textContent = loan.interest + "%";
        row.insertCell(3).textContent = loan.duration / 86400 + " days";
        row.insertCell(4).textContent = loan.isActive ? "Active" : "Repaid";
        row.insertCell(5).textContent = ethers.utils.formatEther(repaymentAmount) + " EDU";
    }
}

async function updateAllLoans() {
    const allLoanIds = await contract.getAllActiveLoans();
    const allLoansElement = document.getElementById("allLoans");
    allLoansElement.innerHTML = '<table class="table"><thead><tr><th>ID</th><th>Amount</th><th>Interest</th><th>Duration</th><th>Borrower</th></tr></thead><tbody id="allLoansBody"></tbody></table>';
    const allLoansBody = document.getElementById("allLoansBody");

    for (let id of allLoanIds) {
        const loan = await contract.getLoanDetails(id);
        
        const row = allLoansBody.insertRow();
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = ethers.utils.formatEther(loan.amount) + " EDU";
        row.insertCell(2).textContent = loan.interest + "%";
        row.insertCell(3).textContent = loan.duration / 86400 + " days";
        row.insertCell(4).textContent = `${loan.borrower.substring(0, 6)}...${loan.borrower.substring(38)}`;
    }
}

function showMessage(message) {
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    document.getElementById('messageModalBody').textContent = message;
    messageModal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('createLoanForm').addEventListener('submit', createLoan);
    document.getElementById('repayLoanForm').addEventListener('submit', repayLoan);
});