export class BankAccount {
    private balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    async deposit(amount: number): Promise<void> {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }

        // await relational DB

        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }

    async withdraw(amount: number): Promise<void> {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }

        if (amount > this.balance) {
            throw new Error('Withdraw: Insufficient funds');
        }

        // await DB

        this.balance -= amount;
        console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
    }

    async checkBalance(): Promise<number> {

        // await DB

        return this.balance;
    }
}

async function main() {
    const account = new BankAccount(1000);

    try {
        await account.deposit(500);
        await account.withdraw(200);
        const balance = await account.checkBalance();
        console.log(`Current balance: ${balance}`);

        //overdraft
        await account.withdraw(2000);
    } catch (error: any) {
        console.error(error.message)
    }
}

main()
