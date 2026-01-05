import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import ListOfUsers from "./components/ListOfUsers";

function App() {
	//Tengo que encontrar otra libreria de tablas que sustituya tremor.
	return (
		<> 
			<ListOfUsers />
			<CreateNewUser />
		</>
	);
}

export default App;
