import { BankAccount } from './BankAccount';

describe('BankAccount', () => {
    let account: BankAccount;

    beforeEach(() => {
        account = new BankAccount(1000);
    });

    test('initial balance is set correctly', async () => {
        expect(await account.checkBalance()).toBe(1000);
    });

    test('deposit increases balance', async () => {
        await account.deposit(500);
        expect(await account.checkBalance()).toBe(1500);
    });

    test('withdraw decreases balance', async () => {
        await account.withdraw(300);
        expect(await account.checkBalance()).toBe(700);
    });

    test('cannot deposit negative amount', async () => {
        await expect(account.deposit(-100)).rejects.toThrow('Deposit amount must be positive');
    });

    test('cannot withdraw negative amount', async () => {
        await expect(account.withdraw(-100)).rejects.toThrow('Withdrawal amount must be positive');
    });

    test('cannot withdraw more than balance', async () => {
        await expect(account.withdraw(1500)).rejects.toThrow('Withdraw: Insufficient funds');
    });

    test('multiple transactions', async () => {
        await account.deposit(500);
        await account.withdraw(200);
        await account.deposit(100);
        expect(await account.checkBalance()).toBe(1400);
    });
});