import {action, computed, makeObservable, observable} from 'mobx';

type TRate = Record<string, Record<string, number>>;

export class MMoney {
  static rates: TRate = {};

  value: number;
  currency: string;

  constructor(value: number, currency: string) {
    this.value = value;
    this.currency = currency;

    makeObservable(this, {
      value: observable,
      currency: observable,
      exchangeTo: action,
      amount: computed,
    });
  }

  exchangeTo(newCurrency: string) {
    if (this.currency === newCurrency) {
      return new MMoney(this.value, this.currency);
    }

    const newValue = this.value * MMoney.rates[this.currency][newCurrency];
    return new MMoney(newValue, newCurrency);
  }

  get amount() {
    return this.value;
  }

  static setRate(from: string, to: string, value: number) {
    if (!this.rates[from]) {
      this.rates[from] = {}
    }

    if (!this.rates[to]) {
      this.rates[to] = {}
    }

    this.rates[from][to] = value;
    this.rates[to][from] = 1 / value;
  }
}
