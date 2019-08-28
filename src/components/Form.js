import React from 'react';
import Error from './Error';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
            errors: {
                name: ''
            }
        };
    }

    UNSAFE_componentWillMount() {
        if (this.props.taskEdit) {
            this.setState({
                id: this.props.taskEdit.id,
                name: this.props.taskEdit.name,
                status: this.props.taskEdit.status
            });
        }
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if (name === 'status') {
            value = event.target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.onSubmitForm(this.state);
            this.props.onToggleForm('close');
            this.onClear();
        }
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    handleValidation(){
        let name = this.state.name;
        let errors = {};
        let formIsValid = true;

        if(!name){
           formIsValid = false;
           errors.name = 'Name can be empty';
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
   }
    
    render() {
        var { onToggleForm } = this.props;
        var { errors, id } = this.state;
        var errorName = (errors.name !== '') ? <Error message={ errors.name } /> : '';
        return (
            <div className="col-4">
                <div className="card">
                    <form onSubmit={ this.onSubmit }>
                        <div className="card-header d-flex justify-content-between">
                            <h4>{ id !== '' ? 'Cap Nhat Cong Viec' : 'Them Cong Viec' }</h4>
                            <i className="far fa-times-circle text-right" onClick={ () => onToggleForm('close') }></i>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="">Tên</label>
                                <input type="text" className={ (errors.name !== '') ? 'form-control error-input' : 'form-control' } name="name"  value={ this.state.name } onChange={ this.onChange } />
                                { errorName }
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Trạng thái</label>
                                <select className="form-control" name="status" value={ this.state.status }  onChange={ this.onChange }>
                                    <option value={ true }>Kích hoạt</option>
                                    <option value={ false }>Ẩn</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-footer justify-content-center d-flex">
                            <button type="submit" className="btn btn-primary mr-2"><i className="far fa-plus-square pr-1"></i>Lưu lại</button>
                            <button 
                                type="button" 
                                className="btn btn-warning"
                                onClick={ this.onClear }
                            >
                                <i className="far fa-times-circle pr-1"></i>Hủy bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}