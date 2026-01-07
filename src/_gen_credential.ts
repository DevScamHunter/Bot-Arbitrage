/**
 * Generate and manage Polymarket CLOB client credentials
 */

import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

export class CredentialGenerator {
    private wallet: ethers.Wallet;
    private chainId: number;

    constructor(privateKey?: string, chainId: number = 137) {
        const key = privateKey || process.env.PRIVATE_KEY;
        if (!key) throw new Error('PRIVATE_KEY missing');
        this.wallet = new ethers.Wallet(key);
        this.chainId = chainId;
    }

    getAddress(): string {
        return this.wallet.address;
    }

    async signForClob(nonce: string): Promise<string> {
        const message =
            `Sign this message to authenticate with Polymarket CLOB API.\n\nNonce: ${nonce}`;
        return this.wallet.signMessage(message);
    }

    getWallet(): ethers.Wallet {
        // expose wallet, NOT private key
        return this.wallet;
    }

    displayInfo(): void {
        console.log(`Address: ${this.wallet.address}`);
        console.log(`Chain ID: ${this.chainId}`);
    }
}

// Example usage
if (require.main === module) {
    try {
        const generator = new CredentialGenerator();
        generator.displayInfo();
        
        console.log('Credentials loaded successfully!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

