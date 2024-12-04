const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    // Deploy the NFT contract
    const GenerativeGraffitiNFT = await hre.ethers.getContractFactory("GenerativeGraffitiNFT");
    const nft = await GenerativeGraffitiNFT.deploy();

    await nft.deployed();

    console.log("GenerativeGraffitiNFT deployed to:", nft.address);

    // Verify contract on Etherscan if we're on a live network
    if (network.name !== "hardhat" && network.name !== "localhost") {
        console.log("Waiting for block confirmations...");
        
        // Wait for 6 block confirmations
        await nft.deployTransaction.wait(6);

        // Verify the contract
        await hre.run("verify:verify", {
            address: nft.address,
            constructorArguments: []
        });

        console.log("Contract verified on Etherscan");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });