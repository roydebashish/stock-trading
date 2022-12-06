import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import {StockChart} from "../components/StockChart";
import {StockData} from "../components/StockData";

const formatData = (data) => {
	return data.t.map((el, index) => {
		return {
			x: el * 1000,
			// y: Math.floor(data.c[index]),
			y: data.c[index].toFixed(2),
		}
	});
}
export const StockDetailPage = () => {
	const {symbol} = useParams();
	const [chartData, setChartData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try{
				const date = new Date();
				const currentTimeInSeconds = Math.floor(date.getTime() / 1000);
				let oneDayAgoTimeInSeconds;
				if(date.getDate() === 6) {
					//2 days ago data if friday
					oneDayAgoTimeInSeconds = currentTimeInSeconds - (2*24*60*60);
				} else if (date.getDate() === 0) {
					//3 days ago if monday
					oneDayAgoTimeInSeconds = currentTimeInSeconds - (3*24*60*60);
				} else {
					oneDayAgoTimeInSeconds = currentTimeInSeconds - (24*60*60);
				}

				const oneWeek = currentTimeInSeconds - 7*24*60*60;
				const oneYear = currentTimeInSeconds - 365*24*60*60;

				Promise.all([
					FinnHub.get('/stock/candle', {
						params: {
							symbol: symbol,
							from: oneDayAgoTimeInSeconds,
							to: currentTimeInSeconds,
							resolution: 30
						}
					}),
					FinnHub.get('/stock/candle', {
						params: {
							symbol: symbol,
							from: oneWeek,
							to: currentTimeInSeconds,
							resolution: 60
						}
					}),
					FinnHub.get('/stock/candle', {
						params: {
							symbol: symbol,
							from: oneYear,
							to: currentTimeInSeconds,
							resolution: 'W'
						}
					})
				]).then(responses => {
					setChartData({
						day: formatData(responses[0].data),
						week: formatData(responses[1].data),
						year: formatData(responses[2].data),
					});
				});

			} catch (err) {
				console.log('error: ', err)
			}
		};

		fetchData();
	}, [symbol]);

	return (<div>
			{chartData &&
				<div>
					<StockChart chartData={chartData} symbol={symbol}/>
					<StockData symbol={symbol} />
				</div>
			}
		</div>
	);
}