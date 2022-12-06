import {createContext, useEffect, useState} from "react";

export const WatchlistContext = createContext();
export const WatchlistContextProvider = (props) => {

	const [watchList, setWatchList] = useState(
		localStorage.getItem('watchlist')?.split(",") || ['GOOGL', 'MSFT', 'AMZN']
	);

	const addStock = (stock) => {
		if(watchList.indexOf(stock) === -1) {
			setWatchList([...watchList, stock])
		}
	}
	const deleteStock = (stock) => {
		setWatchList(watchList.filter((el) => {
			return el !== stock;
		}));
	}

	useEffect(() => {
		localStorage.setItem('watchlist', watchList);
	},[watchList]);

	return <WatchlistContext.Provider value={{watchList, addStock, deleteStock}}>
		{props.children}
	</WatchlistContext.Provider>
};