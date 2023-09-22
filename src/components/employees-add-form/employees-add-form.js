import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            salary:''
        }
    }

    onValueChange = (e) => {
        this.setState({ //так как интересует только конечный результат, а не первое значение, то колбэк необязателен
            [e.target.name]: e.target.value //квадратные скобки - вычисляемое свойство, возможность ES6 стандарта, позволяющая записать свойство в ключ объекта 
        })
    }
    onSubmit = (e) => { //функция отправки значений формы
        e.preventDefault(); //метод для предовтращения стандартного поведения
        if (this.state.name.length < 3 || !this.state.salary) return; //отмена ввода, если имя меньше 3х символов и не введена зарплата
        this.props.onAdd(this.state.name, this.state.salary); // эти значения (this.state.name и this.state.salary) передаются в функцию addItem в качестве аргументов
        this.setState({ //обновление состояния значений свойств name и salary после отправки формы
            name: '',
            salary:''
        })
    }

    render(){
        const{name, salary} = this.state;
        
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name='name'
                        value={name} //управляемый компонент(элемент), значение value будет контролироваться react. То что вводится в инпут, записывается в value. На все изменения интерфейс будет реагировать мгновенно
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name='salary'
                        value={salary} //управляемый компонент
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;