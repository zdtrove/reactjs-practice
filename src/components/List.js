import React from 'react';
import Item from './Item';

const List = (props) => {
    var items = props.tasks.map((task, index) => {
        return <Item key={task.id} index={index} task={task} />
    });
    return (
        <div>
            <table class="table table-bordered">
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

export default List