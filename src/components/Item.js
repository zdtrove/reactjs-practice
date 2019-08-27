import React from 'react';

export default class Item extends React.Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var { task } = this.props;
        return (
            <tr>
                <td>{ this.props.index + 1 }</td>
                <td>{ task.name }</td>
                <td>
                    <span 
                        className={task.status === true ? 'badge badge-success' : 'badge badge-danger' }
                        onClick={ this.onUpdateStatus }
                    >
                        { task.status === true ? 'Kích hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="d-flex">
                    <button type="button" className="btn btn-primary mr-2" onClick={ this.onUpdate }>Sửa</button>
                    <button type="button" className="btn btn-primary" onClick={ this.onDelete }>Xóa</button>
                </td>
            </tr>
        )
    }
}