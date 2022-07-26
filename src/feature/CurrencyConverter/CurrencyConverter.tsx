import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CurrencyButton from './CurrencyButton';
import {MMoney} from '../../store/MCurrency';
import {observer} from 'mobx-react-lite';

interface IProps {
  first: string;
  second: string;
}

const CurrencyConverter = ({first, second}: IProps) => {
  const [value, setValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>(first);

  const momizedValue = useMemo(() => {
    return new MMoney(+value, selectedCurrency);
  }, [selectedCurrency, value]);

  const handleSwitch = useCallback((currency: string) => {
    const newValue = momizedValue.exchangeTo(currency);
    setValue(newValue.amount.toString());
    setSelectedCurrency(currency)
  }, [momizedValue]);

  const renderButton = useCallback((currency: string): JSX.Element => {
    return (
      <CurrencyButton value={currency} onSelect={() => handleSwitch(currency)} selected={currency === selectedCurrency} />
    )
  }, [handleSwitch, selectedCurrency]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${first}&tsyms=${second}`);
      const data = await response.json();

      MMoney.setRate(first, second, data[second]);
    })();
  }, [first, second]);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border-0 py-2 px-4 outline-0 text-center font-bold text-black placeholder-gray-600 text-2xl" placeholder="0.0" />
      <div className="flex w-full gap-5 mt-2">
        {renderButton(first)}
        {renderButton(second)}
      </div>
      <div className="w-full mt-6">
        <button className="w-full flex justify-center px-10 py-2 rounded-full bg-yellow-100 shadow-2xl">MAX</button>
      </div>
    </div>
  );
};

export default observer(CurrencyConverter);
