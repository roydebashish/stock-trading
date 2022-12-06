import {useState, useEffect, useContext} from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill, BsTrashFill} from "react-icons/bs";
import FinnHub from "../apis/FinnHub";
import {WatchlistContext} from "../context/WatchlistContext";
import {useNavigate} from "react-router-dom";

export const StockList = (props) => {
	const [stock, setStock] = useState([]);
	const {watchList, deleteStock } = useContext(WatchlistContext);
	const navigate = useNavigate();

	const changeColor = (change) => {
		return change > 0 ? 'success' : 'danger';
	}
	const renderIcon = (change) => {
		return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>;
	}

	const handleStockSelect = (stockSymbol) => {
		navigate(`details/${stockSymbol}`)
	}

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const responses = Promise.all(watchList.map((stock) => {
					return	FinnHub.get('/quote', {
						params: {
							'symbol' : stock
						}
					});
				}));

				const data = (await responses).map((response) => {
					return {
						'data': response.data,
						'symbol': response.config.params.symbol
					}
				});

				console.log(isMounted);

				if (isMounted) {
					setStock(data);
				}
			} catch (err) {
				console.log(err);
			}
		}

		fetchData();
		return () => (isMounted = false);
	}, [watchList]);


	return (
		<div>
			<table className="table table-hover mt-5">
				<thead style={{color: 'rgb(79, 89, 102)'}}>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Last</th>
						<th scope="col">Chg</th>
						<th scope="col">Chg%</th>
						<th scope="col">High</th>
						<th scope="col">Low</th>
						<th scope="col">Open</th>
						<th scope="col">Close</th>
					</tr>
				</thead>
				<tbody>
				{
					stock.map((stock) => {
						return (
							<tr onClick={() => handleStockSelect(stock.symbol)} className="table-row" key={stock.symbol} style={{cursor: "pointer"}}>
								<th scope="row">{stock.symbol}</th>
								<td>{stock.data.c}</td>
								<td className={`text-${changeColor(stock.data.d)}`}>{stock.data.d} {renderIcon(stock.data.d)}</td>
								<td className={`text-${changeColor(stock.data.dp)}`}>{stock.data.dp} {renderIcon(stock.data.d)}</td>
								<td>{stock.data.h}</td>
								<td>{stock.data.l}</td>
								<td>{stock.data.o}</td>
								<td>
									{stock.data.pc}
									<button className="btn btn-sm btn-danger ml-2 d-inline-block delete-button" onClick={(e) => {
										e.stopPropagation();
										deleteStock(stock.symbol)
									}}><BsTrashFill/></button>
								</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	);
}