import React, { useState } from "react";

export function Home() {
	let [lista, setLista] = useState([]);

	const addTarea = tarea => {
		if (tarea.key === "Enter") {
			setLista([...lista, tarea.target.value]);
		}
	};

	//let remove = lista.splice(0, 1);

	const items = [];

	for (const [index, value] of lista.entries()) {
		items.push(
			<li className="list-group-item" key={index}>
				<button
					className="btn btn-default btn-xs pull-right remove-item float:right"
					onClick={remove}>
					<i className="fas fa-trash-alt text-danger mx-2"></i>
				</button>
				{value}
			</li>
		);
	}

	const remove = () => {
		lista.pop();
		console.log("removed");
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="text-muted">To Do List</h6>
						<input
							id="tarea"
							onKeyDown={addTarea}
							className="form-control"
							type="text"
							placeholder="What needs to be done?"></input>
						<br />
						<ul className="list-group">{items}</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
