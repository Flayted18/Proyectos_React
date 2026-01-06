import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import ListOfUsers from "./components/ListOfUsers";

function App() {
	return (
		<> 
			<Toaster richColors/>
			<ListOfUsers />
			<CreateNewUser />
		</>
	);
}

export default App;
