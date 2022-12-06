import Logo from '../assets/logo.png';

export const Header = () => {
	return (
		<header className="w-50 px-5 pt-5 mx-auto text-center">
			<img src={Logo} className="img img-fluid logo" alt="ST Logo"/>
		</header>
	);
}