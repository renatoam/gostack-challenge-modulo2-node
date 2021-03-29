import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, item) => {
        if (item.type === 'income') acc.income += item.value;
        else acc.outcome += item.value;

        acc.total = acc.income - acc.outcome;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  // public findById(id: string): Transaction | null {
  //   const transaction = this.transactions.find(item => item.id === id);

  //   return transaction || null;
  // }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
