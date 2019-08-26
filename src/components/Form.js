import React from 'react'

const Form = () => {
    return (
        <div className="col-4">
            <div className="card">
                <h4 className="card-header">Title</h4>
                <div className="card-body">
                    <div class="form-group">
                        <label for="">Tên</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="">Trạng thái</label>
                        <select class="form-control">
                            <option>Kích hoạt</option>
                            <option>Chưa kích hoạt</option>
                        </select>
                    </div>
                </div>
                <div className="card-footer justify-content-center d-flex">
                    <button type="button" class="btn btn-primary mr-2">Lưu lại</button>
                    <button type="button" class="btn btn-warning">Hủy bỏ</button>
                </div>
            </div>
        </div>
    )
}

export default Form;