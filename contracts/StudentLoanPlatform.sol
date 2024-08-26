// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StudentLoanPlatform is ReentrancyGuard, Ownable {
    struct Loan {
        uint256 amount;
        uint256 interest;
        uint256 duration;
        uint256 startTime;
        address borrower;
        bool isActive;
    }

    IERC20 public token;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;
    uint256 public minLoanAmount;
    uint256 public maxLoanAmount;
    uint256 public minInterestRate;
    uint256 public maxInterestRate;
    uint256 public minDuration;
    uint256 public maxDuration;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower);
    event PlatformParametersUpdated(uint256 minLoanAmount, uint256 maxLoanAmount, uint256 minInterestRate, uint256 maxInterestRate, uint256 minDuration, uint256 maxDuration);

    constructor(address _token) {
        token = IERC20(_token);
        minLoanAmount = 100 * 10**18; // 100 tokens
        maxLoanAmount = 10000 * 10**18; // 10,000 tokens
        minInterestRate = 1; // 1%
        maxInterestRate = 20; // 20%
        minDuration = 30 days;
        maxDuration = 365 days;
    }

    function createLoan(uint256 _amount, uint256 _interest, uint256 _duration) external nonReentrant {
        require(_amount >= minLoanAmount && _amount <= maxLoanAmount, "Loan amount out of range");
        require(_interest >= minInterestRate && _interest <= maxInterestRate, "Interest rate out of range");
        require(_duration >= minDuration && _duration <= maxDuration, "Duration out of range");

        loanCount++;
        loans[loanCount] = Loan({
            amount: _amount,
            interest: _interest,
            duration: _duration,
            startTime: block.timestamp,
            borrower: msg.sender,
            isActive: true
        });

        require(token.transferFrom(address(this), msg.sender, _amount), "Transfer failed");

        emit LoanCreated(loanCount, msg.sender, _amount);
    }

    function repayLoan(uint256 _loanId) external nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.isActive, "Loan is not active");
        require(loan.borrower == msg.sender, "Only borrower can repay");

        uint256 repaymentAmount = calculateRepaymentAmount(_loanId);
        require(token.transferFrom(msg.sender, address(this), repaymentAmount), "Transfer failed");

        loan.isActive = false;

        emit LoanRepaid(_loanId, msg.sender);
    }

    function calculateRepaymentAmount(uint256 _loanId) public view returns (uint256) {
        Loan storage loan = loans[_loanId];
        uint256 interest = (loan.amount * loan.interest * loan.duration) / (365 days * 100);
        return loan.amount + interest;
    }

    function getLoanDetails(uint256 _loanId) external view returns (Loan memory) {
        return loans[_loanId];
    }

    function getMyLoans() external view returns (uint256[] memory) {
        uint256[] memory myLoanIds = new uint256[](loanCount);
        uint256 count = 0;
        for (uint256 i = 1; i <= loanCount; i++) {
            if (loans[i].borrower == msg.sender) {
                myLoanIds[count] = i;
                count++;
            }
        }
        // Resize the array to remove empty elements
        assembly { mstore(myLoanIds, count) }
        return myLoanIds;
    }

    function getAllActiveLoans() external view returns (uint256[] memory) {
        uint256[] memory activeLoanIds = new uint256[](loanCount);
        uint256 count = 0;
        for (uint256 i = 1; i <= loanCount; i++) {
            if (loans[i].isActive) {
                activeLoanIds[count] = i;
                count++;
            }
        }
        // Resize the array to remove empty elements
        assembly { mstore(activeLoanIds, count) }
        return activeLoanIds;
    }

    function updatePlatformParameters(
        uint256 _minLoanAmount,
        uint256 _maxLoanAmount,
        uint256 _minInterestRate,
        uint256 _maxInterestRate,
        uint256 _minDuration,
        uint256 _maxDuration
    ) external onlyOwner {
        minLoanAmount = _minLoanAmount;
        maxLoanAmount = _maxLoanAmount;
        minInterestRate = _minInterestRate;
        maxInterestRate = _maxInterestRate;
        minDuration = _minDuration;
        maxDuration = _maxDuration;

        emit PlatformParametersUpdated(_minLoanAmount, _maxLoanAmount, _minInterestRate, _maxInterestRate, _minDuration, _maxDuration);
    }
}