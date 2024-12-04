const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GenerativeGraffitiNFT", function () {
    let nft;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy contract
        const GenerativeGraffitiNFT = await ethers.getContractFactory("GenerativeGraffitiNFT");
        nft = await GenerativeGraffitiNFT.deploy();
        await nft.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nft.owner()).to.equal(owner.address);
        });

        it("Should start with token ID 0", async function () {
            const mintPrice = await nft.MINT_PRICE();
            await nft.mint({ value: mintPrice });
            const tokenURI = await nft.tokenURI(1);
            expect(tokenURI).to.be.a("string");
        });
    });

    describe("Minting", function () {
        it("Should allow minting with correct payment", async function () {
            const mintPrice = await nft.MINT_PRICE();
            await expect(nft.connect(addr1).mint({ value: mintPrice }))
                .to.emit(nft, "Transfer")
                .withArgs(ethers.constants.AddressZero, addr1.address, 1);
        });

        it("Should fail when minting with insufficient payment", async function () {
            const mintPrice = await nft.MINT_PRICE();
            await expect(
                nft.connect(addr1).mint({ value: mintPrice.sub(1) })
            ).to.be.revertedWith("Insufficient payment");
        });
    });

    describe("TokenURI", function () {
        it("Should return valid base64 encoded JSON", async function () {
            const mintPrice = await nft.MINT_PRICE();
            await nft.mint({ value: mintPrice });
            
            const tokenURI = await nft.tokenURI(1);
            expect(tokenURI).to.include("data:application/json;base64,");
            
            // Decode base64
            const json = Buffer.from(
                tokenURI.replace("data:application/json;base64,", ""),
                "base64"
            ).toString();
            
            const metadata = JSON.parse(json);
            expect(metadata).to.have.property("name");
            expect(metadata).to.have.property("description");
            expect(metadata).to.have.property("image");
            expect(metadata).to.have.property("attributes");
        });
    });
});