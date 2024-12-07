import { useState } from 'react';
import styles from './app.module.css';

const calculate = (express: string) => new Function(`return ${express}`);

const App: React.FC = () => {
	const [tablo, setTablo] = useState<string>('');
	const [result, setResult] = useState<boolean>(false);
	const [isOperator, setIsOperator] = useState<boolean>(false);

	const NUMS: number[] = [];
	for (let i = 0; i <= 9; i++) {
		NUMS.push(i);
	}

	const clickNumberHandler = ({ target }) => {
		if (!tablo && target.innerText === '0') return;
		if (isOperator && target.innerText === '0') return;
		setIsOperator(false);
		setResult(false);
		const _tablo = tablo + target.innerText;
		setTablo(_tablo);
	};

	const clearHandler = () => {
		setIsOperator(false);
		setResult(false);
		setTablo('');
	};

	const equalHandler = () => {
		!isOperator ? setTablo(calculate(tablo)()) : null;
		!isOperator ? setResult(true) : null;
	};
	const clickOperatorHandler = ({ target }) => {
		if (!isOperator) {
			setResult(false);
			setTablo(`${tablo}${target.innerText}`);
		}
		setIsOperator(true);
	};

	return (
		<div className={styles.container}>
			<h1 style={{ textAlign: 'center' }}>Калькулятор</h1>
			<div className={styles.calculator}>
				<div
					className={result ? `${styles.tablo} ${styles.result}` : styles.tablo}
				>
					{tablo}
				</div>
				<div className={styles.number}>
					{NUMS.map((val, i) => (
						<button
							className={styles.numberButton}
							key={i}
							onClick={clickNumberHandler}
						>
							{val}
						</button>
					))}
					<button
						className={styles.numberButton}
						onClick={clickOperatorHandler}
					>
						+
					</button>
					<button
						className={styles.numberButton}
						onClick={clickOperatorHandler}
					>
						-
					</button>
					<button className={styles.numberButton} onClick={equalHandler}>
						=
					</button>
					<button className={styles.numberButton} onClick={clearHandler}>
						С
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
