import React, {useState} from 'react';
import s from './index.module.css';

const App = () => {

    const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const BUTTONS = [
        {
            key: 'clear',
            name: 'C'
        },
        {
            key: 'plus',
            name: '+'
        },
        {
            key: 'minus',
            name: '-'
        },
        {
            key: 'equals',
            name: '='
        }
    ];


    const [result, setResult] = useState('0');
    const [value, setValue] = useState('');
    const [action, setAction] = useState('');
    const [oldValue, setOldValue] = useState('');

    let his;
    action ?  his = oldValue + action + value : his = value
    const onCLick = (e) => {
        const {target} = e;
        if (target.value === '+' || target.value === '-') {
            return action ? setAction(target.value)
                : (setAction(target.value) , setOldValue(value), setValue(''));
        } else if (target.value === '=') {
             action === '-'
                ? setResult( Number(oldValue) - Number(value))
                : setResult(Number(oldValue) + Number(value));
            setAction('');
            console.log(oldValue,action, value, result);
            setValue('');
            setOldValue('');
        } else if (target.value === 'C') {
            setValue('')
            setOldValue('');
            setAction('');
            setResult('0');
        } else {
            return result !== '0' ? (setOldValue(result), setValue((v) => v + target.value), setResult('0'))
                : setValue((v) => v + target.value);
        }
    }


    return (
        <>
            <div className={s.container}>
                <div className={s.resultWindow}>
                    <div className={value ==='' && action === '' ? s.result: s.his}>
                        {result !== '0' ? result : his}
                    </div>

                </div>
                <div className={s.padWindow}>
                    <div className={s.numberPad}>
                        {NUMBERS.map((i) => <button key={i} className={s.number}
                                                    value={i}
                                                    onClick={onCLick}
                        >{i}</button>)}
                    </div>
                    <div className={s.actionPad}>
                        {BUTTONS.map(({key, name}) => <button key={key} className={s.action}
                                                              value={name}
                                                              onClick={onCLick}
                        >{name}</button>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;