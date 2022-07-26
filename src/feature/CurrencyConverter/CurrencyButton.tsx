import React, {ButtonHTMLAttributes} from 'react';
import {observer} from 'mobx-react-lite';

interface IProps {
  value: string;
  selected?: boolean;
  onSelect: (value: string) => void;
}

const CurrencyButton = ({ value, selected, onSelect }: IProps) => {
  return (
    <button onClick={() => onSelect(value)} className={`flex justify-center w-1/2 px-10 py-2 rounded-full bg-white shadow-2xl ${selected ? 'border-2 border-blue-900' : ''}`}>{value}</button>
  )
}

export default observer(CurrencyButton);
