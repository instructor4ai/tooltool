import React from "react";
import ReactDOM from "react-dom/client";
import { DeckApp } from "./DeckApp";
import "./web.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<DeckApp />
	</React.StrictMode>,
);
