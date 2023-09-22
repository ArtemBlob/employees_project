import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component{
    constructor(props){
        super(props);
        this.state ={
            term: '' //локальный term
        }
    }

    onUpdateSearh = (e) => { //локальный метод
        const term = e.target.value;
        this.setState({term}); //устанавливаю локальный term
        this.props.onUpdateSearh(term); //подъем состояния, вызывая функцию из другого компонента
    }

    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    value ={this.state.term} //value для установки компонента в управляемое состояние
                    onChange={this.onUpdateSearh}/> //подъем локального состояния наверх к родителю
        )
    }
}

export default SearchPanel;