import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HRC20 test", function () {
  it("Should transfer tokens after accepting the terms", async function () {
    const [issuer, holder1, holder2] = await ethers.getSigners();
    const HRC20 = await ethers.getContractFactory("HRC20");
    const hrc20 = await HRC20.deploy("Test tokens", "TST", 1000, 18);

    await hrc20.deployed();

    await hrc20.setTerms("https://Terms/here", "Hash");

    await hrc20.accept("Hash");

    const value = ethers.utils.parseEther("1.0");
    const setHRC20Tx = await hrc20.transfer(holder1.address, value);
    // wait until the transaction is mined
    await setHRC20Tx.wait();
    const issuerbalance = ethers.utils.parseEther("999.0");

    expect(await hrc20.balanceOf(issuer.address)).to.equal(issuerbalance);

    let throws = false;

    try {
      await hrc20.connect(holder1).transfer(holder2.address, ethers.utils.parseEther("0.5"));
    } catch (err) {
      throws = true;
    }
    //Should throw with error string 903 yes
    expect(throws).to.equal(true);


  });
});
