import React, { useState, useEffect } from "react";

export const TodoApp = () => {
	let [lista, setLista] = useState([]);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marichaljoshua",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(resp => {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/marichaljoshua",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(resp => {
					console.log("respuesta", resp);
					return resp.json();
				})
				.then(data => {
					setLista(data);
				})
				.catch(error => {
					//manejo de errores
					console.log(error);
				});
		});
	}, []);

	const addTarea = tarea => {
		if (tarea.key === "Enter") {
			let newObj = {
				label: tarea.target.value,
				done: false
			};
			setLista([...lista, newObj]);
			tarea.target.value = "";
		}
	};

	function delTarea(pos) {
		const tempList = [...lista];
		tempList.splice(pos, 1);
		const methods = ["PUT", "DELETE"];
		if (tempList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/manulabarca",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					setLista(tempList);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/manulabarca",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					setLista(tempList);
					console.log(lista);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	}

	const newList = lista.map((value, index) => (
		<li className="list-group-item" key={index}>
			{value.label}
			<button
				onClick={() => delTarea(index)}
				className="btn btn-default remove-item float-end">
				<i className="fas fa-trash-alt text-danger mx-2"></i>
			</button>
		</li>
	));

	return (
		<div className="text-center mt-5">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="text-muted">To Do List</h6>
						<input
							onKeyDown={addTarea}
							className="form-control"
							type="text"
							placeholder="Add a thing"></input>
						<br />
						<ul className="list-group">{newList}</ul>
					</div>
				</div>
			</div>
			<p>Total Items: {lista.length}</p>
			<button className="btn btn-info">
				<i className="fa fa-trash"></i> Clear List
			</button>
		</div>
	);
};
