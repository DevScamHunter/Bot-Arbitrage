/**
 * Manage token allowances for Polymarket trading
 */

import { ClobClient } from '@polymarket/clob-client';
import { Wallet } from '@ethersproject/wallet';
import * as dotenv from 'dotenv';

dotenv.config();

export class AllowanceManager {
    private wallet: Wallet;
    private client: ClobClient;

    constructor(privateKey?: string, host?: string, chainId?: number) {
        const key = privateKey || process.env.PRIVATE_KEY;
        if (!key) throw new Error('PRIVATE_KEY missing');
        this.wallet = new Wallet(key);

        const apiHost = host || process.env.CLOB_API_URL || 'https://clob.polymarket.com';
        const chain = chainId || parseInt(process.env.POLYGON_CHAIN_ID || '137');
        this.client = new ClobClient(apiHost, chain, this.wallet);
    }

    async checkAllowance(): Promise<string> {
        // chỉ log, chưa call blockchain
        return `Allowance check requires RPC setup`;
    }

    async setAllowance(amount: string): Promise<string> {
        return `Allowance set requires RPC setup`;
    }

    async ensureAllowance(minAmount: number = 1000) {
        const sufficient = await this.isAllowanceSufficient(minAmount);
        if (!sufficient) {
            console.log(`⚠️  Allowance insufficient. Set to ${minAmount} USDC via Polymarket UI.`);
        } else {
            console.log('✅ Allowance sufficient');
        }
    }

    async isAllowanceSufficient(requiredAmount: number): Promise<boolean> {
        const allowanceStr = await this.checkAllowance();
        const allowance = parseFloat(allowanceStr) || 0;
        return allowance >= requiredAmount;
    }
}


// Example usage
if (require.main === module) {
    (async () => {
        try {
            const manager = new AllowanceManager();
            
            // Check current allowance
            await manager.checkAllowance();
            
            // Optionally set allowance (commented out for safety)
            // await manager.setAllowance('1000');
            
        } catch (error) {
            console.error('Error:', error);
            process.exit(1);
        }
    })();
}

