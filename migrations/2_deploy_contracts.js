const StudentLoanPlatform = artifacts.require("StudentLoanPlatform");

module.exports = function(deployer) {
  // Replace with the address of your ERC20 token
  const tokenAddress = "0x9000B6897E4a82bDF46410E012e991e291498477";
  deployer.deploy(StudentLoanPlatform, tokenAddress);
};