import React from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEdit: null
        };
    }

    UNSAFE_componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    rdId = () => {
        return Math.floor((Math.random() * 10000000000) + 1);
    }

    rdString(length = 10) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    createData = () => {
        var tasks = [
            {
                id: this.rdId(),
                name: this.rdString(),
                status: true
            },
            {
                id: this.rdId(),
                name: this.rdString(),
                status: true
            },
            {
                id: this.rdId(),
                name: this.rdString(),
                status: false
            }
        ];
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm = (value = null) => {
        var checkDisplay;
        if (value === 'close') checkDisplay = false;
        else if (value === 'open') checkDisplay = true;
        else checkDisplay = !this.state.isDisplayForm;
        this.setState({
            isDisplayForm: checkDisplay
        });
    }

    onSubmitForm = (data) => {
        var { tasks } = this.state;
        if (data.id === '') {
            var task = {
                id: this.rdId(),
                name: data.name,
                status: data.status
            }
            tasks.push(task);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        this.setState({
            taskEdit: tasks[index]
        }, () => {
            // console.log(this.state.taskEdit);
        });
        this.onToggleForm('open');
    }

    render() {
        var { tasks, isDisplayForm, taskEdit } = this.state;
        var elmForm = isDisplayForm ? <Form taskEdit={ taskEdit } onSubmitForm={ this.onSubmitForm } onToggleForm={ this.onToggleForm } /> : '';
        return (
            <div className="container">
                <div className="row justify-content-center pt-4">
                    <h1>Quản Lý Công Việc</h1>
                </div>
                <hr />
                <div className="row">
                    { elmForm }
                    <div className={ isDisplayForm ? 'col-8' : 'col-12' }>
                        <div className="row d-flex">
                            <div className="col-12">
                                <button 
                                    type="button" 
                                    className="btn btn-primary mr-2"
                                    onClick={ this.onToggleForm }
                                >
                                    <i className="far fa-plus-square pr-1"></i>Thêm công việc
                                </button>
                                <button type="button" className="btn btn-default" onClick={this.createData}>Create Data</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <div className="input-group mt-3 mb-3">
                                    <input type="text" className="form-control" placeholder="Nhập từ khóa..." />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Tìm</button>
                                    </div>
                                    <button type="button" className="btn btn-primary ml-4">Sắp xếp</button>
                                </div>
                            </div>
                        </div>
                        <List
                            onUpdate={ this.onUpdate }
                            onDelete={ this.onDelete } 
                            onUpdateStatus={ this.onUpdateStatus } 
                            tasks={ tasks } 
                        />
                    </div>
                </div>
            </div>
        )
    }
}