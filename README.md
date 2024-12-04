# On-Chain Graffiti NFT

An on-chain generative NFT project that combines Chromie Squiggle-inspired backgrounds with procedurally generated graffiti text art.

## Features

- Fully on-chain SVG generation
- Chromie Squiggle-inspired abstract backgrounds
- Procedurally generated graffiti text
- ERC-721 compliant
- Hardhat deployment and testing setup

## Setup

1. Clone the repository:
```bash
git clone https://github.com/storbars/onchain-graffiti-nft.git
cd onchain-graffiti-nft
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
GOERLI_URL=your_alchemy_or_infura_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Development

1. Compile contracts:
```bash
npx hardhat compile
```

2. Run tests:
```bash
npx hardhat test
```

3. Deploy to network:
```bash
npx hardhat run scripts/deploy.js --network goerli
```