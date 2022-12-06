import {useState, useEffect, useContext} from "react";
import FinnHub from "../apis/FinnHub";
import {WatchlistContext} from "../context/WatchlistContext";

export const AutoComplete = () => {
	const [search, setSearch] = useState('');
	const [result, setResult] = useState([]);
	// const [isMounted, setIsMounted] = useState(true);
	const { addStock } = useContext(WatchlistContext);
	const renderDropdown = () => {
		 const dropdownClass = search.length ? 'show' : null;
		 return(
			 <ul className={`dropdown-menu ${dropdownClass}`} style={{
				 height: '500px',
				 overflowY: 'scroll',
				 overflowX: 'hidden',
				 cursor: 'pointer'
			 }}>
				 {
					 result.map((item) => {
						 return (
							 <li className="dropdown-item" key={item.symbol}
								 onClick={() => {
									 addStock(item.symbol)
									 setSearch('');
								 }}
							 >
								 {item.description}({item.symbol})
							 </li>
						 )
					 })
				 }
			 </ul>
		 )
	}

	useEffect(() => {
		let isMounted = true;
		const searchData = async () => {
			try{
				const response = await FinnHub.get('/search', {
					params: {
						q: search
					}
				});

				console.log(response);
				console.log('isMounted', isMounted);

				if (isMounted) {
					setResult(response.data.result);
				}
			}catch (err) {
				console.log(err);
			}
		};
		if (search.length) {
			searchData();
		} else {
			setResult([]);
		}
		return () => (isMounted = false);
	}, [search]);

	return <div className="w-50 px-5 pt-5 rounded mx-auto">
		<div className="form-floating dropdown">
			<input style={{backgroundColor: "rgba(145, 158, 171, 0.2)"}} id="search" type="text"
			 className="form-control" placeholder="Search" autoComplete="off"
				   onChange={(e) => setSearch(e.target.value)}
				   value={search}
			/>
			<label htmlFor="search">Search</label>
			{renderDropdown() }
		</div>
	</div>
}