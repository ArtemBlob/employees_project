import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [
				{name:'John S.' , salary: 800, increase: false, rise: true, id: 1},
				{name:'Vasiliy P.' , salary: 3000, increase: true, rise: false, id: 2},
				{name:'Carl L.' , salary: 5000, increase: false, rise: false, id: 3}
			],
			term: '',
			filter: 'all',
		}
		this.maxId = 4; //свойство id для всех новых экземпляров компонента
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id) //данные отфильтруются и останутся только те элементы, индификатор которых не совпадает с id переданным в метод
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			rise: false,
			id: this.maxId++
		}
		this.setState(({data}) => {
			const newArr = [...data, newItem] //создание нового массива с учетом добавления newItem
			return {
				data: newArr //замена data на новый массив
			}
		});
	}
	
	// вариант с объединенными onToggleIncrease и onTogglePromotion
	onToggleProp = (id, prop) => {
		this.setState(({data}) => ({ 
			data: data.map(item => {
				if (item.id === id){ 
					return {...item, [prop]: !item[prop]} 
				}
				return item; 
			})
		}))
	}

	searchEmp = (items, term) => { //поиск сотрудников по названию
		if(term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1; // Если подстрока term найдена в строке item.name, то indexOf() вернет положительное число и возвращается новый массив, содержащий только отфильтрованные элементы.
		})
	}

	onUpdateSearh = (term) => { //обновление поиска, устанавливает новое состояние term
		this.setState({term});
	}

	filterPost = (items, filter) => {
		switch (filter) { //break в react необязателен
			case 'rise': 
				return items.filter(item => item.rise);
			case 'moreThen1000':
				return items.filter(item => item.salary > 1000);
			default:
				return items
		}

	}

	onFilterSelect = (filter) => {
		this.setState({filter});
	}

	onSalaryChange = (id, newSalary) => {
		console.log("ID:", id, "New Salary:", newSalary);
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {
						...item,
						salary: newSalary
					};
				}
				return item;
			})
		}));
	};

	render() {
		const {data, term, filter} = this.state;
		const employees = this.state.data.length; //общее кол-во сотрудников
		const increased = this.state.data.filter(item => item.increase).length //сотрудников на премию, filter возвращает только те объекты у кого increas: true
		const visibleData = this.filterPost(this.searchEmp(data, term), filter); //будет фильтроваться отфильтрованный по имени массив

		return (
			<div className="app">
				<AppInfo employees={employees} increased ={increased}/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSearh={this.onUpdateSearh}/>
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
				</div>
				
				<EmployeesList 
				data={visibleData}
				onDelete={this.deleteItem} //паттерн спуска состояния
				// onToggleProp объединяет методы и пропы onToggleIncrease и onTogglePromotion пример паттерна подъема состояния
				onToggleProp={this.onToggleProp}
				onSalaryChange={this.onSalaryChange}/>
				<EmployeesAddForm onAdd={this.addItem}/> 
			</div> //onAdd пример паттерна спуска состояния
		);
	}
}

export default App;
