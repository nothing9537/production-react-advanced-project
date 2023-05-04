import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Counter } from "./components/Counter/Counter";
import ThemeProvider from "./theme/ThemeProvider";

render(
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root')
)