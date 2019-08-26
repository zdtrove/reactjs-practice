import React from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false
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

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        });
    }

    render() {
        var { tasks, isDisplayForm } = this.state;
        var elmForm = isDisplayForm ? <Form /> : '';
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
                                    Thêm công việc
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
                                    <button type="button" class="btn btn-primary ml-4">Sắp xếp</button>
                                </div>
                            </div>
                        </div>
                        <List tasks={tasks} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
