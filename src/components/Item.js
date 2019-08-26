import React from 'react';

const Item = (props) => {
    return (
        <tr>
            <td>{ props.index + 1 }</td>
            <td>{ props.task.name }</td>
            <td>Kích hoạt</td>
            <td className="d-flex">
                <button type="button" className="btn btn-primary mr-2">Sửa</button>
                <button type="button" className="btn btn-primary">Xóa</button>
            </td>
        </tr>
    )
}

export default Item;