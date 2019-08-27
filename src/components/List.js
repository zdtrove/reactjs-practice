import React from 'react';
import Item from './Item';

export default class List extends React.Component {
    render() {
        var { tasks, onUpdateStatus, onDelete, onUpdate } = this.props;
        var items = tasks.map((task, index) => {
            return <Item 
                onUpdate={ onUpdate }
                onDelete={ onDelete } 
                onUpdateStatus={ onUpdateStatus }  
                key={task.id} 
                index={index} 
                task={task} 
            />
        });
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }
}