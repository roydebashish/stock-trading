import {useState, useEffect} from "react";
import FinnHub from "../apis/FinnHub";

export const StockData = ({symbol}) => {
	const [stockData, setStockData] = useState('');
	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await FinnHub.get('/stock/profile2',{
					params: {
						symbol
					}
				});

				console.log(response.data);
				if(isMounted) {
					setStockData(response.data);
				}
			} catch (e) {
				console.log('error: ', e)
			}
		}

		fetchData();
		return () => (isMounted = false);
	}, [symbol]);

	return (<div className="mt-4 mb-5">
			{stockData &&
				(<div className="row border rounded shadow-sm bg-white p-4" style={{backgroundColor: "rgb(145, 158, 171)"}}>
					<div className="col">
						<div>
							<span className="fw-bold">Name: </span>
							{ stockData.name }
						</div>
						<div>
							<span className="fw-bold">Country: </span>
							{ stockData.country }
						</div>
						<div>
							<span className="fw-bold">Ticker: </span>
							{ stockData.ticker }
						</div>
					</div>
					<div className="col">
						<div>
							<span className="fw-bold">Exchange: </span>
							{ stockData.exchange }
						</div>
						<div>
							<span className="fw-bold">Industry: </span>
							{ stockData.finnhubIndustry }
						</div>
						<div>
							<span className="fw-bold">IPO: </span>
							{ stockData.ipo }
						</div>
					</div>
					<div className="col">
						<div>
							<span className="fw-bold">Market Cap: </span>
							{ stockData.marketCapitalization }
						</div>
						<div>
							<span className="fw-bold">Shares Outstanding: </span>
							{ stockData.shareOutstanding }
						</div>
						<div>
							<span className="fw-bold">URL: </span>
							<a href={stockData.weburl} rel="noreferrer" target="_blank">{stockData.weburl}</a>
						</div>
					</div>
				</div>)
			}
		</div>
	);
}